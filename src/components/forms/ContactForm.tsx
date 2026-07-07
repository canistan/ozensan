"use client";

import React, { useState } from 'react';
import { useToast } from "@/components/ui/ToastContext";
import { Link } from "@/i18n/routing";
import { submitContactMessage } from "@/app/actions/submitForm";

export default function ContactForm() {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    kvkk: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      addToast("Lütfen tüm zorunlu alanları doldurunuz.", "error");
      return;
    }

    if (!formData.email.includes('@')) {
      addToast("Lütfen geçerli bir e-posta adresi giriniz.", "error");
      return;
    }

    if (!formData.kvkk) {
      addToast("Devam etmek için KVKK Aydınlatma Metni'ni onaylamalısınız.", "error");
      return;
    }

    setLoading(true);
    try {
      const result = await submitContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      if (result.success) {
        addToast("Mesajınız başarıyla iletildi. En kısa sürede dönüş yapacağız.", "success");
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          kvkk: false
        });
      } else {
        addToast(result.error || "Bir hata oluştu.", "error");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      addToast("Bağlantı hatası oluştu. Lütfen tekrar deneyin.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-[#1A1E24] mb-2">Ad Soyad / Firma Adı *</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:border-transparent transition-shadow text-[#1A1E24]"
            placeholder="Adınızı giriniz"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-[#1A1E24] mb-2">E-Posta Adresi *</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:border-transparent transition-shadow text-[#1A1E24]"
            placeholder="ornek@firma.com"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-[#1A1E24] mb-2">Telefon Numarası *</label>
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
        <div>
          <label htmlFor="subject" className="block text-sm font-bold text-[#1A1E24] mb-2">Konu *</label>
          <input 
            type="text" 
            id="subject" 
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:border-transparent transition-shadow text-[#1A1E24]"
            placeholder="Mesajınızın konusu"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold text-[#1A1E24] mb-2">Mesajınız *</label>
        <textarea 
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange} 
          rows={5}
          className="w-full bg-[#F8F9FA] border border-neutral-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:border-transparent transition-shadow text-[#1A1E24] resize-none"
          placeholder="Size nasıl yardımcı olabiliriz?"
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
          <Link href="/kvkk" className="text-[#C61A1A] hover:underline font-medium">KVKK Aydınlatma Metni</Link>'ni okudum ve kabul ediyorum.
        </label>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="bg-[#C61A1A] hover:bg-[#a51515] text-white font-bold py-4 px-8 rounded-lg transition-all w-full md:w-auto shadow-[0_8px_20px_rgba(198,26,26,0.25)] hover:shadow-[0_8px_25px_rgba(198,26,26,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
      >
        {loading ? 'Gönderiliyor...' : 'Mesajı Gönder'}
        {!loading && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
      </button>
    </form>
  );
}
