"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FaJava, FaReact, FaHtml5, FaCss3Alt, FaDocker } from "react-icons/fa";
import { SiSpringboot, SiMysql, SiJavascript, SiHibernate, SiApachemaven } from "react-icons/si";

export default function Home() {
  const featuredSkills = [
    { name: "Java", icon: <FaJava /> },
    { name: "Spring Boot", icon: <SiSpringboot /> },
    { name: "React", icon: <FaReact /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "HTML5", icon: <FaHtml5 /> },
    { name: "CSS3", icon: <FaCss3Alt /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "Hibernate", icon: <SiHibernate /> },
    { name: "Docker", icon: <FaDocker /> },
    { name: "Maven", icon: <SiApachemaven /> },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-6">
              A Full-Stack Developer
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Crafting Digital Experiences
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-xl text-muted-foreground mb-10">
              Hi, I&apos;m Vishesh Kumar. I build robust and scalable web applications, transforming complex ideas into elegant, user-friendly solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/projects" passHref>
                <Button size="lg">View My Projects</Button>
              </Link>
              <Link href="/resume" passHref>
                <Button size="lg" variant="outline">Read My Resume</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Showcase Section */}
      <section className="py-20 lg:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-4">Technologies I Use</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-12">
            I leverage a modern tech stack to build efficient and scalable applications.
          </p>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {featuredSkills.map(skill => (
              <div key={skill.name} className="flex items-center gap-2 bg-background p-3 rounded-lg shadow-sm">
                <span className="text-2xl text-muted-foreground">{skill.icon}</span>
                <span className="font-medium">{skill.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- FEATURED PROJECTS SECTION UPDATED --- */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-4">Featured Projects</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-12">
              Here&apos;s a selection of my work that showcases my problem-solving skills.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* --- PROJECT: TASKTRAIL --- */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>TaskTrail</CardTitle>
                      <CardDescription>Offline-first Productivity & Habit Tracker</CardDescription>
                    </div>
                    <Badge variant="outline">In Progress</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-sm text-muted-foreground mb-4">A Spring Boot app using JPA/Hibernate and SQLite. Track goals, habits, and tasks locally with a focus on privacy.</p>
                  <Link href="/projects" passHref>
                    <Button variant="secondary" className="w-full">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* --- PROJECT: PERSONAL EXPENSE TRACKER --- */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>Personal Expense Tracker</CardTitle>
                  <CardDescription>A full-stack app for managing personal finances.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-sm text-muted-foreground mb-4">Built with Spring Boot and MySQL, featuring JWT-based security and a reporting dashboard.</p>
                  <Link href="/projects" passHref>
                    <Button variant="secondary" className="w-full">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}