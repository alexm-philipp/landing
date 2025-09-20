export default function Head() {
    return (
      <>
        {/* ✅ Preconnects to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
  
        {/* ✅ Preload font to reduce render-blocking */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Geist&display=swap"
          as="style"
        />
      </>
    );
  }
  