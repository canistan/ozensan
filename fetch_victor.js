const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  // Attempt to bypass simple bot checks
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
  
  try {
    await page.goto('https://esab.com/tr/eur_tr/brands/esab-family-brands/victor/', { waitUntil: 'networkidle2', timeout: 15000 });
    const imgUrls = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img')).map(img => img.src);
    });
    console.log(imgUrls.filter(src => src.toLowerCase().includes('victor') && (src.includes('logo') || src.includes('svg') || src.includes('png'))));
  } catch (err) {
    console.log('Error:', err.message);
  } finally {
    await browser.close();
  }
})();
