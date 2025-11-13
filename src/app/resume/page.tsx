"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Globe, Github, Download, ExternalLink } from "lucide-react";

function ClientEmailButton() {
  const [emailHref, setEmailHref] = useState<string | null>(null);

  useEffect(() => {
    const user = "visheshkumarraghuvanshi";
    const domain = "gmail.com";
    const timer = setTimeout(() => {
      setEmailHref(`mailto:${user}@${domain}`);
    }, 1);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a 
      href={emailHref || "#"} 
      onClick={(e) => !emailHref && e.preventDefault()}
      aria-disabled={!emailHref}
      className={`flex items-center gap-3 group ${!emailHref ? "cursor-not-allowed opacity-70" : ""}`}
    >
      <Mail className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
      <span className={!emailHref ? "italic" : ""}>
        {emailHref ? "visheshkumarraghuvanshi@gmail.com" : "Loading email..."}
      </span>
    </a>
  );
}

const skillCategories = [
  { 
    title: "Backend",
    skills: ["Java", "Spring Framework", "Spring Boot", "JPA", "Hibernate", "Spring Security"]
  },
  { 
    title: "Frontend",
    skills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"]
  },
  {
    title: "Databases & Tools",
    skills: ["MySQL", "SQLite", "Docker", "Git & GitHub", "Maven", "Postman"]
  }
];

const projects = [
  {
    title: "TaskTrail (In Progress)",
    description: "An offline-first productivity app using Spring Boot to track goals, habits, and tasks locally.",
    bullets: [
      "Designed a local-first architecture using Spring Boot, JPA/Hibernate, and SQLite.",
      "Focusing on a clean API design for future desktop or mobile client integration.",
      "Implementing habit-tracking logic and daily progress summaries."
    ]
  },
  {
    title: "Personal Expense Tracker",
    description: "A web application to manage and analyze personal expenses with real-time insights.",
    bullets: [
      "Developed a full-stack Spring Boot + MySQL application.",
      "Implemented JWT-based authentication and authorization for secure access.",
      "Created a dashboard with monthly and category-wise reports."
    ]
  }
];

const certifications = [
  { 
    name: "Learn JAVA Programming - Beginner to Master", 
    issuer: "Udemy (Abdul Bari)", 
    date: "Nov 2025", 
    url: "https://www.udemy.com/certificate/UC-30c402b2-baeb-461b-a50a-2d40f95a3e36/" 
  },
  { name: "SQL Intermediate", issuer: "HackerRank", date: "Mar 2023", url: "https://www.hackerrank.com/certificates/c168670a37b5" },
  { name: "SQL Basics", issuer: "HackerRank", date: "Mar 2023", url: "https://www.hackerrank.com/certificates/01c5ee523753" },
  { name: "Java Basics", issuer: "HackerRank", date: "Mar 2023", url: "https://www.hackerrank.com/certificates/7729385bb33d" },
  { name: "SQL", issuer: "SoloLearn", date: "Dec 2022", url: "https://www.sololearn.com/Certificate/CT-8UIDGWUL/pdf" },
  { name: "Programming Basics", issuer: "IITBOMBAYX", date: "May 2022 | Grade: A+", url: "https://certificate.iitbombayx.in/downloads/ef579ada82934c428dffc2135aa1c718/Certificate.pdf" },
];


export default function ResumePage() {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32 max-w-4xl">
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">VISHESH KUMAR</h1>
            <p className="text-lg text-muted-foreground">Java Full-Stack Developer</p>
          </div>
          
          <a href="/Vishesh_Resume.pdf" download="Vishesh_Kumar_Resume.pdf">
            <Button className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </a>
        </div>

        <div className="space-y-8">

          <motion.section 
            variants={sectionVariants} 
            initial="hidden" 
            animate="visible" 
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">

                <ClientEmailButton />
                
                <a href="tel:+918989202147" className="flex items-center gap-3 group">
                  <Phone className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span>+91 89892 02147</span>
                </a>
                <a href="https_www.visheshraghuvanshi.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <Globe className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span>www.visheshraghuvanshi.in</span>
                </a>
                {/* --- Updated GitHub URL --- */}
                <a href="https://github.com/vishesh0x" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <Github className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span>github.com/vishesh0x</span>
                </a>
              </CardContent>
            </Card>
          </motion.section>

          <motion.section 
            variants={sectionVariants} 
            initial="hidden" 
            animate="visible"
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillCategories.map((category) => (
                  <div key={category.title}>
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">{category.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.section>

          <motion.section 
            variants={sectionVariants} 
            initial="hidden" 
            animate="visible"
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardDescription>A summary of my key technical projects.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {projects.map((project, index) => (
                  <div key={project.title} className={index > 0 ? "pt-6 border-t" : ""}>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground italic mt-1">{project.description}</p>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1 text-sm">
                      {project.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.section>
          
          <motion.section 
            variants={sectionVariants} 
            initial="hidden" 
            animate="visible"
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>A collection of my certified skills and achievements.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {certifications.map(cert => (
                  <div key={cert.name + cert.issuer} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-4 border-t first:pt-0 first:border-none">
                    <div>
                      <h3 className="font-semibold">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">{cert.issuer} | {cert.date}</p>
                    </div>
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="shrink-0">
                        <Button variant="link" className="p-0 h-auto text-sm">
                          View Certificate <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.section>

          {/* --- EDUCATION SECTION --- */}
          <motion.section 
            variants={sectionVariants} 
            initial="hidden" 
            animate="visible"
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
          >
            <Card>
              <CardHeader><CardTitle>Education</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">B.Tech, Computer Science</h3>
                  <p className="text-sm text-muted-foreground">Sushila Devi Bansal College of Engineering, Indore (Graduated: July 2024)</p>
                  <p className="text-sm">CGPA: 8.15</p>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-semibold">Class XII</h3>
                  <p className="text-sm text-muted-foreground">Kendriya Vidyalaya Mhow (2020)</p>
                  <p className="text-sm">Percentage: 87.4%</p>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-semibold">Class X</h3>
                  <p className="text-sm text-muted-foreground">Kendriya Vidyalaya Mhow (2018)</p>
                  <p className="text-sm">Percentage: 81.8%</p>
                </div>
              </CardContent>
            </Card>
          </motion.section>

        </div>
      </div>
    </div>
  );
}