import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize JS/CSS
  swcMinify: true,

  // Only target modern browsers (drop legacy polyfills)
  browserslist: [
    "last 2 versions",
    "not dead",
    "not ie <= 11",
  ],

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;
              connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.google-analytics.com;
              img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com;
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
