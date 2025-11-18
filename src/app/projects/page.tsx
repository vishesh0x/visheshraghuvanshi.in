"use client";

import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const projects = [
    {
      title: "TaskTrail",
      description: "An offline-first productivity app using Spring Boot and SQLite to track goals, habits, and tasks locally.",
      tags: ["Spring Boot", "Hibernate", "SQLite", "Java", "In Progress"],
      imageUrl: "/project-placeholder.png",
      githubUrl: "https://github.com/vishesh0x/tasktrail",
      liveUrl: "#", 
    },
    {
      title: "ET Expense Tracker",
      description: "A web application to manage and analyze personal expenses with real-time insights.",
      tags: ["Spring Boot", "MySQL", "Java", "JWT"],
      imageUrl: "/projects/et.png",
      githubUrl: "https://github.com/vishesh0x/expense-tracker",
      liveUrl: "https://et-expense-tracker.vercel.app/",
    },
    {
      title: "Excellence Study",
      description: "An all-in-one online learning platform providing educational resources including articles, courses, and videos.",
      tags: ["React", "Firebase", "GraphQL", "Hashnode API"],
      imageUrl: "/projects/excellencestudy.png",
      githubUrl: "https://github.com/vishesh0x/excellence-study",
      liveUrl: "https://excellence-study.netlify.app/", 
    },
    {
      title: "Doubt Solving Portal (DSP)",
      description: "A web application enabling students to ask questions, get faculty responses, and engage in collaborative learning.",
      tags: ["PHP", "MySQL", "Collaborative Learning"],
      imageUrl: "/projects/dsp.png",
      githubUrl: "https://github.com/vishesh0x/dsp",
      liveUrl: "https://dsp.page.gd/index.php",
    },
  ];
  
  return (
    <div className="bg-secondary/50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 md:mb-6">
            My Work
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-2">
            A collection of my projects that demonstrate my skills in turning ideas into functional and user-friendly applications.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="h-full" // Ensures the motion div takes full height so cards stretch evenly
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}