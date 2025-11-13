"use client";

import { useState, useEffect } from "react"; 
import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { 
  SiX, 
  SiInstagram, 
  SiFacebook, 
  SiLeetcode, 
  SiBluesky 
} from "react-icons/si";
import ContactForm from "@/components/ContactForm";

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
      target="_blank" 
      rel="noopener noreferrer"
      aria-disabled={!emailHref}
      onClick={(e) => !emailHref && e.preventDefault()}
      className={!emailHref ? "cursor-not-allowed" : ""}
    >
      <Button 
        variant="outline" 
        className="w-full justify-start gap-3" 
        disabled={!emailHref}
      >
        <Mail className="h-4 w-4" />
        <span>Email</span>
      </Button>
    </a>
  );
}


export default function ContactPage() {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const contactLinks = [
    {
      icon: <Linkedin className="h-4 w-4" />,
      name: "LinkedIn",
      url: "https://linkedin.com/in/vishesh0x",
    },
    {
      icon: <Github className="h-4 w-4" />,
      name: "GitHub",
      url: "https://github.com/vishesh0x",
    },
    {
      icon: <SiLeetcode className="h-4 w-4" />,
      name: "LeetCode",
      url: "https://leetcode.com/u/visheshkr/",
    },
    {
      icon: <SiX className="h-4 w-4" />,
      name: "X (Twitter)",
      url: "https://x.com/vishesh0x",
    },
    {
      icon: <SiInstagram className="h-4 w-4" />,
      name: "Instagram",
      url: "https://instagram.com/thevisheshraghuvanshi",
    },
    {
      icon: <SiFacebook className="h-4 w-4" />,
      name: "Facebook",
      url: "https://facebook.com/vishesh0x",
    },
    {
      icon: <SiBluesky className="h-4 w-4" />,
      name: "Bluesky",
      url: "https://bsky.app/profile/visheshraghuvanshi.in",
    },
  ];

  return (
    <div className="bg-secondary/50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Get In Touch
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Whether you have a project idea, a question, or just want to connect, I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto mt-12 sm:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl">Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I&apos;ll get back to you as soon as I can.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-1"
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl">Connect with Me</CardTitle>
                  <CardDescription>
                    Find me on socials, coding platforms, or just send me an email.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {/* --- 3. RENDER THE NEW COMPONENT --- */}
                    <ClientEmailButton />
                    
                    {/* Render the rest of the links */}
                    {contactLinks.map((link) => (
                      <a 
                        key={link.name} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="w-full justify-start gap-3">
                          {link.icon}
                          <span>{link.name}</span>
                        </Button>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}