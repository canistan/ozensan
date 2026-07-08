"use client";

import React, { useState } from 'react';
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/ToastContext";
import { Link } from "@/i18n/routing";
import { submitContactMessage } from "@/app/actions/submitForm";

export default function CareerForm() {
  const t = useTranslations("Forms");
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    linkedinUrl: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: '',
    kvkk: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.position || !formData.coverLetter) {
      addToast(t("errors.required"), "error");
      return;
    }

    if (!formData.email.includes('@')) {
      addToast(t("errors.email"), "error");
      return;
    }

    if (!formData.kvkk) {
      addToast(t("errors.kvkk"), "error");
      return;
    }

    setLoading(true);
    const subjectLine = `[KARİYER BAŞVURUSU] ${formData.position}`;
    const formattedMessage = `
Başvurulan Pozisyon: ${formData.position}
LinkedIn: ${formData.linkedinUrl || 'Belirtilmedi'}

Ön Yazı:
${formData.coverLetter}
    `.trim();
    
    try {
      const result = await submitContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: subjectLine,
        message: formattedMessage,
      });

      if (result.success) {
        addToast(t("success.career"), "success");
        setFormData({
          name: '',
          linkedinUrl: '',
          email: '',
          phone: '',
          position: '',
          coverLetter: '',
          kvkk: false
        });
      } else {
        addToast(result.errorKey ? t(`errors.${result.errorKey}`) : t("errors.general_error"), "error");
      }
    } catch (error) {
      console.error("Form submit error:", error);
      addToast(t("errors.general_error"), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-[#1A1E24] mb-2">{t("name")} *</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:border-transparent transition-shadow text-[#1A1E24]"
            placeholder={t("name")}
          />
        </div>
        <div>
          <label htmlFor="linkedinUrl" className="block text-sm font-bold text-[#1A1E24] mb-2">LinkedIn Profil Linki (Opsiyonel)</label>
          <input 
            type="url" 
            id="linkedinUrl" 
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleChange}
            className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:border-transparent transition-shadow text-[#1A1E24]"
            placeholder="https://linkedin.com/in/..."
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-[#1A1E24] mb-2">{t("email")} *</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:border-transparent transition-shadow text-[#1A1E24]"
            placeholder="ornek@mail.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-[#1A1E24] mb-2">{t("phone")} *</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:border-transparent transition-shadow text-[#1A1E24]"
            placeholder="0555 555 55 55"
          />
        </div>
      </div>

      <div>
        <label htmlFor="position" className="block text-sm font-bold text-[#1A1E24] mb-2">Başvurduğunuz Pozisyon / Uzmanlık Alanınız *</label>
        <input 
          type="text" 
          id="position" 
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:border-transparent transition-shadow text-[#1A1E24]"
          placeholder="Örn: Satış Mühendisi, Makine Teknikeri..."
        />
      </div>

      <div>
        <label htmlFor="coverLetter" className="block text-sm font-bold text-[#1A1E24] mb-2">Ön Yazı / Bize Kendinizden Bahsedin *</label>
        <textarea 
          id="coverLetter"
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange} 
          rows={6}
          className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:border-transparent transition-shadow text-[#1A1E24] resize-none"
          placeholder="Deneyimleriniz, Özensan'da ne gibi değerler katabileceğiniz..."
        ></textarea>
      </div>

      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input 
            id="kvkk" 
            name="kvkk"
            type="checkbox"
            checked={formData.kvkk}
            onChange={handleChange} 
            className="w-4 h-4 bg-white border-neutral-300 rounded text-[#C61A1A] focus:ring-[#C61A1A]" 
          />
        </div>
        <label htmlFor="kvkk" className="ml-2 text-sm text-neutral-600">
          <Link href="/kvkk" className="text-[#C61A1A] hover:underline font-medium">{t("kvkk")}</Link>{t("kvkk_read")}
        </label>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="bg-[#C61A1A] hover:bg-[#a51515] text-white font-bold py-4 px-8 rounded-lg transition-all w-full md:w-auto shadow-[0_8px_20px_rgba(198,26,26,0.25)] hover:shadow-[0_8px_25px_rgba(198,26,26,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
      >
        {loading ? t('sending') : 'Başvurumu Tamamla'}
        {!loading && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
      </button>
    </form>
  );
}
