"use client";

import Link from "next/link";
// --- 1. Import usePathname for active links ---
import { usePathname } from "next/navigation";
import { Menu, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger, 
  // --- 2. Import SheetClose for mobile UX ---
  SheetClose 
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import React from "react";

export default function Header() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  // --- 3. Get the current path ---
  const pathname = usePathname();
  const isResumeActive = pathname === "/resume";

  return (
    <header className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      {/* --- Responsive container padding --- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        
        {/* --- 4. Logo with consistent branding --- */}
        <Link href="/" className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="font-bold tracking-tight text-xl">Vishesh Kumar</span>
        </Link>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} passHref>
              {/* --- 5. Active link styling (desktop) --- */}
              <Button variant={pathname === link.href ? "secondary" : "ghost"}>
                {link.name}
              </Button>
            </Link>
          ))}
          <div className="flex items-center gap-2 ml-4">
            <Link href="/resume" passHref>
              {/* --- 6. Active link styling for Resume button --- */}
              <Button variant={isResumeActive ? "secondary" : "default"}>
                My Resume
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </nav>

        {/* --- Mobile Navigation --- */}
        <div className="md:hidden flex items-center gap-2">
          {/* --- 7. Theme toggle for mobile --- */}
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  {/* --- 8. Add SheetClose for good UX --- */}
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-2 text-lg">
                      <Code className="h-6 w-6 text-primary" />
                      <span className="font-serif font-bold tracking-tight text-xl">Vishesh Kumar</span>
                    </Link>
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>
              <Separator className="my-4" />
              <div className="flex flex-col space-y-4">
                {/* --- 9. Active links & SheetClose (mobile) --- */}
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link href={link.href} passHref>
                      <Button 
                        variant={pathname === link.href ? "secondary" : "ghost"} 
                        className="w-full justify-start text-lg"
                      >
                        {link.name}
                      </Button>
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link href="/resume" passHref>
                    <Button 
                      variant={isResumeActive ? "secondary" : "default"} 
                      className="w-full text-lg"
                    >
                      My Resume
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}