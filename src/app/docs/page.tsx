import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import DocsListing from "./DocsListing";

export const metadata: Metadata = {
  title: "Dokümanlar | Özensan",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const dynamic = "force-dynamic";

interface PDFInfo {
  slug: string;
  name: string;
  fileName: string;
  blobUrl: string;
  sizeMB: string;
  uploadedAt: string;
}

function getDocs(): PDFInfo[] {
  const configPath = path.join(process.cwd(), "shared-docs.json");
  if (!fs.existsSync(configPath)) return [];

  try {
    const docs: PDFInfo[] = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return docs.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
  } catch {
    return [];
  }
}

export default function DocsPage() {
  const pdfs = getDocs();

  return (
    <html lang="tr">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#0B0F14", color: "#E2E8F0", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
        <DocsListing pdfs={pdfs} />
      </body>
    </html>
  );
}
