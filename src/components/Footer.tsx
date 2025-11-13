"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Code, Github, Linkedin } from "lucide-react";
// --- 1. Import new icons ---
import { SiX, SiLeetcode } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // --- 2. Updated and more relevant social links ---
  const socialLinks = [
    { name: "GitHub", href: "https://github.com/vishesh0x", icon: <Github className="h-4 w-4" /> },
    { name: "LinkedIn", href: "https://linkedin.com/in/vishesh0x", icon: <Linkedin className="h-4 w-4" /> },
    { name: "X", href: "https://x.com/vishesh0x", icon: <SiX className="h-4 w-4" /> },
    { name: "LeetCode", href: "https://leetcode.com/u/visheshkr/", icon: <SiLeetcode className="h-4 w-4" /> },
  ];

  return (
    <footer className="bg-secondary/50">
      {/* --- Top Section: Call to Action (Refined) --- */}
      <div className="py-12 md:py-16">
        {/* --- Responsive padding --- */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* --- 3. Brand-consistent font --- */}
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Let&apos;s Build Something Amazing
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Have a project in mind or an opportunity to discuss? I&apos;m always open to connecting.
          </p>
          <Link href="/contact">
            <Button size="lg">Get In Touch</Button>
          </Link>
        </div>
      </div>

      {/* --- Bottom Section: Links & Copyright (Rebuilt) --- */}
      <div className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* --- 4. New responsive layout --- */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            
            {/* Left Side: Logo & Copyright */}
            <div className="text-center sm:text-left">
              <Link href="/" className="flex items-center justify-center sm:justify-start gap-2">
                <Code className="h-5 w-5 text-primary" />
                {/* --- 5. Brand-consistent font --- */}
                <span className="font-bold tracking-tight text-lg">Vishesh Kumar</span>
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                &copy; {currentYear} Vishesh Kumar. All Rights Reserved.
              </p>
            </div>
            
            {/* Right Side: Socials */}
            <div className="flex gap-2">
              {socialLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.name}
                >
                  {/* --- 6. Cleaner "ghost" variant for icon buttons --- */}
                  <Button variant="ghost" size="icon">
                    {link.icon}
                  </Button>
                </a>
              ))}
            </div>
          </div>
          
          {/* --- 7. All repetitive nav links and old copyright text removed --- */}

        </div>
      </div>
    </footer>
  );
}