"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/ToastContext";
import { unsubscribeNewsletter } from "@/app/actions/submitForm";
import { Link } from "@/i18n/routing";

export default function UnsubscribeForm() {
  const t = useTranslations("Unsubscribe");
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      addToast(t("error"), "error");
      return;
    }

    setLoading(true);
    const result = await unsubscribeNewsletter(email);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      addToast(t("success"), "success");
    } else {
      addToast(result.errorKey ? t(result.errorKey) : t("error"), "error");
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[#C61A1A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#C61A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#1A1E24] mb-4">{t("success")}</h3>
        <Link href="/" className="inline-block mt-4 bg-[#C61A1A] hover:bg-[#9D1414] text-white font-bold py-3 px-8 rounded-sm transition-colors tracking-widest text-sm uppercase">
          {t("backToHome")}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-[#1A1E24] mb-2 uppercase tracking-wider">
          {t("emailLabel")} <span className="text-[#C61A1A]">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-4 bg-[#F8F9FA] border border-neutral-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:border-transparent transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#1A1E24] hover:bg-[#C61A1A] text-white font-black py-4 px-8 rounded-sm transition-all tracking-widest text-sm uppercase disabled:opacity-70 flex justify-center items-center"
      >
        {loading ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          t("submit")
        )}
      </button>
    </form>
  );
}
