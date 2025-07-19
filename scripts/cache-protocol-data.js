#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const { createWriteStream } = require('fs');

// Import protocol data
const protocols = require('../.velite/protocols.json');

const DEFILLAMA_BASE_URL = 'https://api.llama.fi';
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ICONS_DIR = path.join(PUBLIC_DIR, 'images', 'protocols');
const CACHE_FILE = path.join(__dirname, '..', 'src', 'lib', 'data', 'cached-protocol-data.json');

// Ensure directories exist
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

const cacheDir = path.dirname(CACHE_FILE);
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

// Helper function to download image
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(filepath);
    const request = https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${path.basename(filepath)}`);
          resolve();
        });
      } else {
        console.warn(`Failed to download ${url}: ${response.statusCode}`);
        resolve(); // Don't reject, just skip this image
      }
    });
    request.on('error', (err) => {
      console.warn(`Error downloading ${url}:`, err.message);
      resolve(); // Don't reject, just skip this image
    });
    request.setTimeout(10000, () => {
      request.destroy();
      console.warn(`Timeout downloading ${url}`);
      resolve();
    });
  });
}

// Helper function to get file extension from URL
function getFileExtension(url) {
  const match = url.match(/\.(png|jpg|jpeg|svg|webp)(\?.*)?$/i);
  return match ? match[1] : 'png';
}

// Helper function to sanitize filename
function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
}

async function fetchDeFiLlamaData() {
  console.log('Fetching DeFiLlama protocol data...');
  
  try {
    const response = await fetch(`${DEFILLAMA_BASE_URL}/protocols`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const apiData = await response.json();
    console.log(`Fetched data for ${apiData.length} protocols from DeFiLlama`);
    return apiData;
  } catch (error) {
    console.error('Error fetching DeFiLlama data:', error);
    return [];
  }
}

async function cacheProtocolData() {
  console.log('Starting protocol data caching...');
  
  const apiData = await fetchDeFiLlamaData();
  if (apiData.length === 0) {
    console.error('No data fetched from DeFiLlama, exiting...');
    process.exit(1);
  }

  const cachedData = [];
  const downloadPromises = [];

  for (const protocol of protocols) {
    console.log(`Processing protocol: ${protocol.protocol}`);
    
    // Find matching DeFiLlama data for each slug
    const defillama_data = protocol.defillama_slug
      .map(slug => apiData.find(d => d.slug === slug))
      .filter(Boolean); // Remove undefined entries

    if (defillama_data.length === 0) {
      console.log(`No DeFiLlama data found for ${protocol.protocol}, using defaults`);
      cachedData.push({
        id: protocol.id,
        protocol: protocol.protocol,
        type: '',
        logo: '/images/placeholder.png',
        tvl: 0,
        chainTvls: {},
        defillama_slugs: protocol.defillama_slug
      });
      continue;
    }

    // Use the first valid logo found
    const logoUrl = defillama_data[0]?.logo;
    let localLogoPath = '/images/placeholder.png';

    if (logoUrl && logoUrl.startsWith('http')) {
      const extension = getFileExtension(logoUrl);
      const filename = `${sanitizeFilename(protocol.id)}.${extension}`;
      const filepath = path.join(ICONS_DIR, filename);
      localLogoPath = `/images/protocols/${filename}`;

      // Add download promise
      downloadPromises.push(
        downloadImage(logoUrl, filepath).catch(err => {
          console.warn(`Failed to download logo for ${protocol.protocol}:`, err);
        })
      );
    }

    // Combine chain TVLs from all slugs
    const combinedChainTvls = {};
    defillama_data.forEach(data => {
      if (data.chainTvls) {
        Object.entries(data.chainTvls).forEach(([chain, tvl]) => {
          combinedChainTvls[chain] = (combinedChainTvls[chain] || 0) + tvl;
        });
      }
    });

    // Calculate total TVL
    const totalTvl = Object.values(combinedChainTvls).reduce((sum, tvl) => sum + tvl, 0);

    cachedData.push({
      id: protocol.id,
      protocol: protocol.protocol,
      type: defillama_data[0]?.category || '',
      logo: localLogoPath,
      tvl: totalTvl,
      chainTvls: combinedChainTvls,
      defillama_slugs: protocol.defillama_slug
    });
  }

  // Download all images concurrently (with some limit)
  console.log(`Downloading ${downloadPromises.length} protocol logos...`);
  const batchSize = 10;
  for (let i = 0; i < downloadPromises.length; i += batchSize) {
    const batch = downloadPromises.slice(i, i + batchSize);
    await Promise.all(batch);
  }

  // Write cached data to file
  const cacheContent = {
    generatedAt: new Date().toISOString(),
    protocolCount: cachedData.length,
    protocols: cachedData
  };

  fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheContent, null, 2));
  console.log(`Cached data written to ${CACHE_FILE}`);
  console.log(`Total protocols cached: ${cachedData.length}`);
  console.log('Protocol data caching completed!');
}

// Run the script
if (require.main === module) {
  cacheProtocolData().catch(error => {
    console.error('Script failed:', error);
    process.exit(1);
  });
}

module.exports = { cacheProtocolData };