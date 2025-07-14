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
        // Filter out protocols without logos and infrastructure reviews
        const protocolsWithLogos = data
          .filter(protocol => {
            // Filter out protocols without logos
            if (!protocol.logo) return false;
            
            // Filter out protocols that only have infrastructure reviews (stages starting with "I")
            const hasNonInfrastructureReview = protocol.reviews.some(review => 
              !review.stage?.toString().startsWith("I")
            );
            return hasNonInfrastructureReview;
          });

        // Filter protocols based on their reviews: include only if they have valid stages (0,1,2)
        // OR if they only have "O" stages (no valid stages at all)
        const filteredProtocols = protocolsWithLogos
          .filter(protocol => {
            // Check if this protocol has any valid stage reviews (0, 1, 2)
            const hasValidStages = protocol.reviews.some(review => 
              [0, 1, 2].includes(review.stage as number)
            );
            
            if (hasValidStages) {
              // If it has valid stages, include it
              return true;
            }
            
            // If it doesn't have valid stages, include it only if it has "O" stages
            // (meaning it's a protocol that only exists in "Others" category)
            const hasOnlyOStages = protocol.reviews.some(review => review.stage === "O") &&
              protocol.reviews.every(review => 
                review.stage === "O" || review.stage?.toString().startsWith("I")
              );
            
            return hasOnlyOStages;
          })
          .sort((a, b) => a.protocol.localeCompare(b.protocol));
        
        setProtocols(filteredProtocols);
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
                // Find the best review for this protocol to create the link
                // Priority: valid stages (0,1,2) > "O" stages > other stages
                const validStageReview = protocol.reviews.find(review => 
                  [0, 1, 2].includes(review.stage as number)
                );
                const oStageReview = protocol.reviews.find(review => 
                  review.stage === "O"
                );
                const firstValidReview = validStageReview || oStageReview || protocol.reviews.find(review => 
                  !review.stage?.toString().startsWith("I")
                );
                // Use the same slug approach as the table
                const protocolSlug = firstValidReview ? firstValidReview.slug : null;
                
                if (!protocolSlug) return null;
                
                return (
                  <Link
                    key={`${protocol.protocol}-${index}`}
                    href={protocolSlug}
                    className="relative w-8 h-8 hover:scale-110 transition-all duration-300 flex-shrink-0 cursor-pointer"
                    onClick={(e) => {
                      // Ensure immediate navigation
                      e.stopPropagation();
                      e.preventDefault();
                      window.location.href = protocolSlug;
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