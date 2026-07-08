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
      "telephone": "+90-312-385-23-45",
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
      "streetAddress": "Ostim OSB Mahallesi 100. Yıl Bulvarı No: 55",
      "addressLocality": "Yenimahalle",
      "addressRegion": "Ankara",
      "postalCode": "06374",
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
    "telephone": "+90-312-385-23-45",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ostim OSB Mahallesi 100. Yıl Bulvarı No: 55",
      "addressLocality": "Yenimahalle",
      "addressRegion": "Ankara",
      "postalCode": "06374",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 39.9678,
      "longitude": 32.7441
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
