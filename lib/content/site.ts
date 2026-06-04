export interface SocialLink {
  platform: string;
  href: string;
  handle: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  bio: string;
  socials: SocialLink[];
  email: string;
  phone: string;
  website: string;
}

const site: SiteConfig = {
  name: "Vishesh",
  tagline: "Backend Engineer.",
  bio: "I build scalable backend systems by day and fill sketchbooks at night. This is my desk.",
  email: "me@visheshraghuvanshi.in",
  phone: "+91-8989202147",
  website: "visheshraghuvanshi.in",
  socials: [
    {
      platform: "GitHub",
      href: "https://github.com/vishesh0x",
      handle: "@vishesh0x",
    },
    {
      platform: "LinkedIn",
      href: "https://linkedin.com/in/vishesh0x",
      handle: "vishesh0x",
    },
    {
      platform: "LeetCode",
      href: "https://leetcode.com/u/visheshkr",
      handle: "visheshkr",
    },
    {
      platform: "Instagram",
      href: "https://instagram.com/thevisheshraghuvanshi",
      handle: "@thevisheshraghuvanshi",
    },
  ],
};

export default site;
