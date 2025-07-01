"use client";

import React, { useState, useEffect, useRef } from 'react';
import { loadReviews } from '@/lib/data/utils';
import { Project } from '@/lib/types';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ProtocolCarouselProps {
  onSeeAllClick?: () => void;
}

export const ProtocolCarousel: React.FC<ProtocolCarouselProps> = ({ onSeeAllClick }) => {
  const [protocols, setProtocols] = useState<Project[]>([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const pauseTimeRef = useRef(0);
  const totalPausedTimeRef = useRef(0);

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const data = await loadReviews();
        // Filter out protocols without logos, infrastructure reviews, unqualified protocols, and sort by name for consistency
        const protocolsWithLogos = data
          .filter(protocol => {
            // Filter out protocols without logos
            if (!protocol.logo) return false;
            
            // Filter out protocols that only have infrastructure reviews (stages starting with "I") or unqualified ("O")
            const hasValidReview = protocol.reviews.some(review => 
              !review.stage?.toString().startsWith("I") && review.stage !== "O"
            );
            return hasValidReview;
          })
          .sort((a, b) => a.protocol.localeCompare(b.protocol));
        
        setProtocols(protocolsWithLogos);
      } catch (error) {
        console.error('Error loading protocols:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProtocols();
  }, []);

  // Update ref when state changes and track pause times
  useEffect(() => {
    if (isPaused && !isPausedRef.current) {
      // Starting to pause - record the time
      pauseTimeRef.current = performance.now();
    } else if (!isPaused && isPausedRef.current) {
      // Resuming from pause - add the paused duration to total
      totalPausedTimeRef.current += performance.now() - pauseTimeRef.current;
    }
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Constant sliding animation
  useEffect(() => {
    if (protocols.length === 0) return;

    const logoWidth = 40; // 32px logo + 8px gap
    const totalWidth = protocols.length * logoWidth;
    let animationId: number;
    let startTime: number;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      
      // Only update position when not paused (using ref to get current value)
      if (!isPausedRef.current) {
        const elapsed = (currentTime - startTime) - totalPausedTimeRef.current;
        const speed = 30; // pixels per second - adjust this to change speed
        const newOffset = (elapsed * speed / 1000) % totalWidth;
        setCurrentOffset(newOffset);
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [protocols.length]); // Only depend on protocols.length, not isPaused

  if (loading) {
    return (
      <div className="border-t pt-6">
        <div className="mb-4">
          <p className="text-xs text-center text-muted-foreground">
            DeFiScan reviews DeFi protocols to assess their decentralization progress and centralization risks. 
            We score protocols from Stage 0 to Stage 2 to help users make informed decisions.
          </p>
        </div>
        <div className="text-center text-muted-foreground">Loading protocols...</div>
      </div>
    );
  }

  if (protocols.length === 0) {
    return null;
  }

  // Create extended array for seamless looping
  const extendedProtocols = [...protocols, ...protocols, ...protocols];

  return (
    <div className="border-t pt-6">
      <div className="mb-4">
        <p className="text-xs text-center text-muted-foreground">
          DeFiScan reviews DeFi protocols to assess their decentralization progress and centralization risks. 
          We score protocols from Stage 0 to Stage 2 to help users make informed decisions.
        </p>
      </div>
      
      {/* Full width carousel */}
      <div 
        className="mb-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden">
          <div className="relative h-8 my-2">
            <div 
              className="flex gap-2 absolute inset-0"
              style={{
                transform: `translateX(-${currentOffset}px)`,
                width: `${extendedProtocols.length * 40}px` // 32px width + 8px gap
              }}
            >
              {extendedProtocols.map((protocol, index) => {
                // Find the first valid review (not infrastructure or unqualified) for this protocol to create the link
                const firstValidReview = protocol.reviews.find(review => 
                  !review.stage?.toString().startsWith("I") && review.stage !== "O"
                );
                // Use the same slug approach as the table
                const protocolSlug = firstValidReview ? firstValidReview.slug : null;
                
                if (!protocolSlug) return null;
                
                return (
                  <Link
                    key={`${protocol.protocol}-${index}`}
                    href={protocolSlug}
                    className="relative w-8 h-8 hover:scale-110 transition-all duration-300 flex-shrink-0"
                    onClick={(e) => {
                      // Ensure normal click behavior
                      e.stopPropagation();
                    }}
                  >
                    <Image
                      src={protocol.logo}
                      alt={`${protocol.protocol} logo`}
                      fill
                      className="rounded-full object-cover border border-gray-100"
                      sizes="32px"
                      onError={(e) => {
                        // Fallback for broken images
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* See all reviews button */}
      {onSeeAllClick && (
        <div className="pt-4 text-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onSeeAllClick}
            className="text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            See all reviews
          </Button>
        </div>
      )}
    </div>
  );
};