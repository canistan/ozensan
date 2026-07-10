import React from 'react';

export default function OrganizationSchema() {
  const orgData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Özensan Sanayi Makine ve Malzemeleri A.Ş.",
    "url": "https://www.ozensanas.com",
    "logo": "https://www.ozensanas.com/logoseffaf.webp",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": ["+90-212-244-13-50", "+90-530-567-11-16"],
      "contactType": "customer service",
      "areaServed": "TR",
      "availableLanguage": ["Turkish", "English"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/ozensan-a-s/",
      "https://www.instagram.com/ozensan.as/"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Arap Cami, Bereketzade Medresesi Sk. No:12/A",
      "addressLocality": "Karaköy, Beyoğlu",
      "addressRegion": "İstanbul",
      "postalCode": "34421",
      "addressCountry": "TR"
    }
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Özensan Sanayi Makine ve Malzemeleri A.Ş.",
    "image": "https://www.ozensanas.com/logoseffaf.webp",
    "@id": "https://www.ozensanas.com",
    "url": "https://www.ozensanas.com",
    "telephone": ["+90-212-244-13-50", "+90-530-567-11-16"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Arap Cami, Bereketzade Medresesi Sk. No:12/A",
      "addressLocality": "Karaköy, Beyoğlu",
      "addressRegion": "İstanbul",
      "postalCode": "34421",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.0241,
      "longitude": 28.9740
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
    </>
  );
}
