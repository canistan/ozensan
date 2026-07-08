"use client";

import Error from 'next/error';

// This is the global fallback for 404.
// next-intl middleware usually catches non-matching routes and redirects them to /[locale]/...
// where the localized not-found.tsx will take over.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}
