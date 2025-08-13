"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

const MainNav = ({
  className,
  items,
}: {
  className: string;
  items: NavItem[];
}) => {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {items.map((item, i) => (
        <Link
          key={`main-nav-item-${i}`}
          href={item.href}
          className="text-sm font-normal transition-colors hover:text-primary"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/framework", label: "Framework" },
    { href: "/submit-review", label: "Submit review" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container px-4 mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-primary">
              <img
                src="/images/defiscan_by_dc_color_for_light_background.svg"
                alt="Logo"
                className="w-32 md:w-44"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <MainNav items={navLinks} className="hidden md:flex" />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
