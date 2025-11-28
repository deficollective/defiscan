"use client";

import React, { useState, useEffect } from "react";
import { FaLinkedinIn, FaDiscord, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "./ui/button";

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        setIsVisible(true);
      } else if (scrollTop > 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 p-2 backdrop-filter backdrop-blur-lg bg-white/30 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="container mx-auto flex flex-col-reverse gap-2 sm:flex-row justify-between items-center">
        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://deficollective.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-gray-800 hover:gray-900 transition-colors duration-200"
          >
            DeFi Collective
          </a>
        </div>
        <div className="text-xs uppercase flex gap-4">
          <a
            href="/terms"
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Terms
          </a>
          <a
            href="/privacy"
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Privacy
          </a>
        </div>
        <div className="flex">
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://x.com/defiscan_info"
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <FaXTwitter className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://www.linkedin.com/company/defiscan"
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <FaLinkedinIn className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://discord.gg/Z467Ehv6VU"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/deficollective/defiscan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
