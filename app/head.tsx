export default function Head() {
    return (
      <>
        {/* Preconnect to analytics and ads origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        {/* Preconnect to fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .text-5xl { font-size: 3rem; line-height: 1; }
            .font-black { font-weight: 900; }
            .text-gray-900 { color: #111827; }
            .mb-6 { margin-bottom: 1.5rem; }
            .leading-tight { line-height: 1.25; }
            .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
            .from-orange-500 { --tw-gradient-from: #f97316; --tw-gradient-to: rgb(249 115 22 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
            .to-orange-700 { --tw-gradient-to: #c2410c; }
            .bg-clip-text { background-clip: text; }
            .text-transparent { color: transparent; }
            .underline { text-decoration-line: underline; }
            .decoration-orange-500 { text-decoration-color: #f97316; }
            @media (min-width: 768px) {
              .md\\:text-5xl { font-size: 3rem; line-height: 1; }
            }
          `
        }} />
      </>
    );
  }
  