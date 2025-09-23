import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize JS/CSS (swcMinify is default in Next.js 15+)
  
  // Modern browser targets to avoid legacy polyfills
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Optimize CSS loading
  experimental: {
    optimizePackageImports: ['@next/third-parties'],
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  
  // Optimize images and static assets
  images: {
    formats: ['image/webp', 'image/avif'],
  },

  
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://*.google.com;
              connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.google-analytics.com https://www.google.com https://googleads.g.doubleclick.net https://*.google.com;
              img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://googleads.g.doubleclick.net https://*.google.com https://*.google.ae;
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
