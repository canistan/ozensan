"use client";

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import faqData from '@/data/faq.json';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const locale = useLocale();
  const isEn = locale === 'en';

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {faqData.map((item, idx) => {
        const question = isEn ? item.questionEn : item.questionTr;
        const answer = isEn ? item.answerEn : item.answerTr;
        return (
        <div key={idx} className="border border-neutral-200 rounded-lg bg-white overflow-hidden transition-all duration-300">
          <button 
            onClick={() => toggle(idx)}
            className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
          >
            <h3 className="text-lg font-bold text-[#1A1E24] pr-8 group-hover:text-[#C61A1A] transition-colors">
              {question}
            </h3>
            <div className={`shrink-0 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-[#C61A1A]' : 'text-[#8A95A5]'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          
          <div 
            className={`transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="p-6 pt-0 text-[#8A95A5] leading-relaxed border-t border-neutral-100 mt-2">
              {answer}
            </div>
          </div>
        </div>
      )})}
    </div>
  );
}
