"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RotatingTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export function RotatingText({ 
  text, 
  className, 
  speed = 2
}: RotatingTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRotate, setShouldRotate] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(0);

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      const textWidth = textRef.current.scrollWidth;
      const containerWidth = containerRef.current.clientWidth;
      
      if (textWidth > containerWidth) {
        setShouldRotate(true);
        // Calculate duration based on text length and speed
        const duration = textWidth / (speed * 10);
        setAnimationDuration(duration);
      } else {
        setShouldRotate(false);
      }
    }
  }, [text, speed]);

  return (
    <div 
      ref={containerRef}
      className={cn("overflow-hidden whitespace-nowrap w-full", className)}
    >
      <div
        ref={textRef}
        className={cn(
          "inline-block",
          shouldRotate && "animate-marquee"
        )}
        style={
          shouldRotate
            ? {
                animationDuration: `${animationDuration}s`,
                animationIterationCount: "infinite",
                animationTimingFunction: "linear",
              }
            : undefined
        }
      >
        {shouldRotate ? `${text} • ${text}` : text}
      </div>
    </div>
  );
}