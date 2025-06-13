/** @type {import("next").NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "renovation.thememove.com",
        port: ""
      },
    ]
  },
};

module.exports = nextConfig;
