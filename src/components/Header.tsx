"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger, 
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

  const pathname = usePathname();
  const isResumeActive = pathname === "/resume";

  return (
    <header className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        
        <Link href="/" className="flex items-center gap-2">
          <div className="h-6 w-6 bg-primary text-primary-foreground flex items-center justify-center rounded-md font-bold text-sm">
            V
          </div>
          <span className="font-bold tracking-tight text-xl">Vishesh Kumar</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} passHref>
              <Button variant={pathname === link.href ? "secondary" : "ghost"}>
                {link.name}
              </Button>
            </Link>
          ))}
          <div className="flex items-center gap-2 ml-4">
            <Link href="/resume" passHref>
              <Button variant={isResumeActive ? "secondary" : "default"}>
                My Resume
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </nav>

        <div className="md:hidden flex items-center gap-2">
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
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-2 text-lg">
                      <div className="h-6 w-6 bg-primary text-primary-foreground flex items-center justify-center rounded-md font-bold text-sm">
                        V
                      </div>
                      <span className="font-bold tracking-tight text-xl">Vishesh Kumar</span>
                    </Link>
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>
              <Separator className="my-4" />
              <div className="flex flex-col space-y-4">
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