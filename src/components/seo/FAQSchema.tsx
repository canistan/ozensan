import React from 'react';
import faqData from '@/data/faq.json';

export default function FAQSchema({ locale = 'tr' }: { locale?: string }) {
  const isEn = locale === 'en';
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": isEn ? item.questionEn : item.questionTr,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": isEn ? item.answerEn : item.answerTr
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
