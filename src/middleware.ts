import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Engellenen AI crawler bot User-Agent'ları
// robots.txt'ye uymayan botları burada yakalıyoruz
const BLOCKED_BOTS = [
  'bytespider',     // ByteDance / TikTok (Çin)
  'baiduspider',    // Baidu (Çin)
  'petalbot',       // Huawei (Çin)
  'sogou',          // Sogou (Çin)
  'yisouspider',    // Yisou (Çin)
  'gptbot',         // OpenAI
  'chatgpt-user',   // OpenAI ChatGPT
  'claudebot',      // Anthropic
  'anthropic-ai',   // Anthropic
  'ccbot',          // Common Crawl
  'facebookbot',    // Meta
  'amazonbot',      // Amazon
  'perplexitybot',  // Perplexity
  'cohere-ai',      // Cohere
  'semrushbot',     // Semrush
  'ahrefsbot',      // Ahrefs
  'mj12bot',        // Majestic
  'dotbot',         // Moz
];

export default function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';

  // Bilinen AI/crawler botlarını engelle
  const isBlockedBot = BLOCKED_BOTS.some(bot => userAgent.includes(bot));
  if (isBlockedBot) {
    return new NextResponse(null, { status: 403 });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|admin|docs|_next|_vercel|.*\\..*).*)']
};

