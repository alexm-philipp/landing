import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize JS/CSS
  swcMinify: true,

  // Note: browserslist should live in package.json for build tools

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net;
              connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.google-analytics.com https://www.google.com https://googleads.g.doubleclick.net;
              img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              frame-src https://www.googletagmanager.com;
            `.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
