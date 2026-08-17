"use client";

import Link from "next/link";

interface PDFInfo {
  slug: string;
  name: string;
  fileName: string;
  blobUrl: string;
  sizeMB: string;
  uploadedAt: string;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function DocsListing({ pdfs }: { pdfs: PDFInfo[] }) {
  return (
    <>
      {/* Header */}
      <header
        style={{
          background: "linear-gradient(135deg, #0B0F14 0%, #1A1E24 50%, #0B0F14 100%)",
          borderBottom: "1px solid rgba(198, 26, 26, 0.3)",
          padding: "0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "40px 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #C61A1A, #8B1212)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(198, 26, 26, 0.3)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 800, letterSpacing: "-0.5px", color: "#FFFFFF" }}>
                Paylaşılan Dokümanlar
              </h1>
              <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#8A95A5" }}>
                Özensan A.Ş. — Dahili Doküman Paylaşımı
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
        {pdfs.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "16px",
              border: "1px dashed rgba(138, 149, 165, 0.3)",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                background: "rgba(138, 149, 165, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8A95A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
              </svg>
            </div>
            <h2 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: 700, color: "#E2E8F0" }}>
              Henüz doküman yüklenmedi
            </h2>
            <p style={{ margin: 0, fontSize: "14px", color: "#8A95A5", maxWidth: "400px", marginLeft: "auto", marginRight: "auto", lineHeight: "1.6" }}>
              PDF yüklemek için: <code style={{ background: "rgba(198, 26, 26, 0.15)", color: "#F87171", padding: "2px 8px", borderRadius: "4px", fontSize: "13px" }}>node upload_pdf.mjs dosya.pdf</code>
            </p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "16px" }}>
            {pdfs.map((pdf) => (
              <Link
                key={pdf.slug}
                href={`/docs/${pdf.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  padding: "24px",
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: "12px",
                  border: "1px solid rgba(138, 149, 165, 0.15)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(198, 26, 26, 0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(198, 26, 26, 0.4)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(138, 149, 165, 0.15)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* PDF Icon */}
                <div
                  style={{
                    flexShrink: 0,
                    width: "52px",
                    height: "52px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(198, 26, 26, 0.2), rgba(198, 26, 26, 0.05))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: 600, color: "#FFFFFF" }}>
                    {pdf.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: "13px", color: "#8A95A5" }}>
                    {pdf.sizeMB} MB • {formatDate(pdf.uploadedAt)}
                  </p>
                </div>

                {/* Arrow */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8A95A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "40px 24px", fontSize: "12px", color: "#8A95A5" }}>
        Bu sayfa arama motorları tarafından indekslenmez.
      </footer>
    </>
  );
}
