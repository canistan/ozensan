import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import PDFViewer from "./PDFViewer";

export const dynamic = "force-dynamic";

interface PDFInfo {
  slug: string;
  name: string;
  fileName: string;
  blobUrl: string;
  sizeMB: string;
  uploadedAt: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

function findDoc(slug: string): PDFInfo | undefined {
  const configPath = path.join(process.cwd(), "shared-docs.json");
  if (!fs.existsSync(configPath)) return undefined;

  try {
    const docs: PDFInfo[] = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return docs.find((d) => d.slug === slug);
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = findDoc(slug);
  const name = doc?.name || slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: `${name} | Özensan Dokümanlar`,
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
}

export default async function DocViewerPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = findDoc(slug);

  if (!doc) {
    notFound();
  }

  return (
    <html lang="tr">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#0B0F14", color: "#E2E8F0", fontFamily: "'Inter', sans-serif", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <PDFViewer name={doc.name} pdfUrl={doc.blobUrl} sizeMB={doc.sizeMB} />
      </body>
    </html>
  );
}
