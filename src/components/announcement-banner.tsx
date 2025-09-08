"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AnnouncementBannerProps {
  // Easy configuration options
  show: boolean;
  text: string | React.ReactNode;
  backgroundColor: string;
  textColor?: string;
  useGradientText?: boolean;
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  show,
  text,
  backgroundColor,
  textColor = 'white',
  useGradientText = false
}) => {
  const [isVisible, setIsVisible] = useState(show);

  if (!isVisible || !show) {
    return null;
  }

  return (
    <div 
      className="w-full fixed bottom-0 z-40"
      style={{ backgroundColor }}
    >
      <div className="px-4 py-2">
        <div className="flex items-center justify-center relative max-w-7xl mx-auto">
          <div className="text-sm font-medium text-center flex-1">
            {useGradientText ? (
              <span style={{
                background: 'linear-gradient(90deg, #CDB5F4, #F4B5C9, #F5C89F, #AFCBFA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {text}
              </span>
            ) : (
              <span style={{ color: textColor }}>{text}</span>
            )}
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-0 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
            aria-label="Close banner"
          >
            <X 
              className="w-4 h-4" 
              style={{ color: textColor }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;