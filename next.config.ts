import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Allow HMR / dev server access from local network IPs.
   * Needed when accessing the dev server from another device on the same Wi-Fi.
   */
  allowedDevOrigins: [
    "192.168.1.7",
    // Add more local IPs here if you test from other devices, e.g. "192.168.1.10"
  ],
};

export default nextConfig;
