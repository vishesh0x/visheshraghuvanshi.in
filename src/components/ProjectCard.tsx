"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectCard({ title, description, tags, imageUrl, githubUrl, liveUrl }: ProjectCardProps) {
  // --- Check for valid URLs (not just '#') ---
  const hasGitHub = githubUrl && githubUrl !== '#';
  const hasLiveDemo = liveUrl && liveUrl !== '#';

  return (
    // --- Cleaner hover effect (lift only, no scale) ---
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="overflow-hidden flex flex-col h-full group">
        <div className="relative h-52 w-full overflow-hidden">
          {/* --- Modern next/image syntax --- */}
          <Image 
            src={imageUrl} 
            alt={title} 
            fill
            style={{ objectFit: "cover" }} 
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow justify-between gap-6">
          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                // --- Smart badge for "In Progress" ---
                <Badge 
                  key={tag} 
                  variant={tag.toLowerCase() === 'in progress' ? 'default' : 'secondary'}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* --- Only render button container if there is at least one valid link --- */}
          {(hasGitHub || hasLiveDemo) && (
            // --- Responsive button layout (stacks on mobile) ---
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              {hasGitHub && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Button>
                </a>
              )}
              {hasLiveDemo && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Button>
                </a>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}