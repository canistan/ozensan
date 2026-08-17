"use client";

import Link from "next/link";

interface PDFViewerProps {
  name: string;
  pdfUrl: string;
  sizeMB: string;
}

export default function PDFViewer({ name, pdfUrl, sizeMB }: PDFViewerProps) {
  return (
    <>
      {/* Toolbar */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
          background: "linear-gradient(135deg, #0B0F14, #1A1E24)",
          borderBottom: "1px solid rgba(198, 26, 26, 0.3)",
          flexShrink: 0,
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", minWidth: 0, flex: 1 }}>
          {/* Back button */}
          <Link
            href="/docs"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(138, 149, 165, 0.2)",
              textDecoration: "none",
              color: "#E2E8F0",
              flexShrink: 0,
              transition: "all 0.2s ease",
            }}
            title="Tüm Dokümanlar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15,18 9,12 15,6" />
            </svg>
          </Link>

          {/* Document info */}
          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: 700,
                color: "#FFFFFF",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </h1>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#8A95A5" }}>
              PDF • {sizeMB} MB
            </p>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          {/* Copy Link */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              const btn = document.getElementById("copy-btn");
              if (btn) {
                btn.textContent = "Kopyalandı!";
                setTimeout(() => {
                  btn.textContent = "Link Kopyala";
                }, 2000);
              }
            }}
            id="copy-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(138, 149, 165, 0.2)",
              color: "#E2E8F0",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Link Kopyala
          </button>

          {/* Download */}
          <a
            href={pdfUrl}
            download
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #C61A1A, #8B1212)",
              border: "none",
              color: "#FFFFFF",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 12px rgba(198, 26, 26, 0.3)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            İndir
          </a>
        </div>
      </header>

      {/* PDF Embed - Full Screen */}
      <div style={{ flex: 1, position: "relative" }}>
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
          title={name}
        />
      </div>
    </>
  );
}
