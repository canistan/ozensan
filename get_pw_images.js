const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // DUSS
  await page.goto('https://www.duss.de/en/products/drilling/rotary-hammers/p-26-c');
  const dussImg = await page.evaluate(() => document.querySelector('img[src*="produkte/bohren"]')?.src);
  console.log('DUSS:', dussImg);

  // Cedima
  await page.goto('https://www.cedima.com/en/products.html');
  const cedimaImg = await page.evaluate(() => document.querySelector('img[src*="csm_"]')?.src);
  console.log('CEDIMA:', cedimaImg);

  // Ticab
  await page.goto('https://ticab.eu/en/catalog/bse/');
  const ticabImg = await page.evaluate(() => document.querySelector('.woocommerce-product-gallery__image img')?.src);
  console.log('TICAB:', ticabImg);

  // Victor
  await page.goto('https://esab.com/tr/eur_tr/brands/esab-family-brands/victor/');
  const victorImg = await page.evaluate(() => document.querySelector('img[src*="victor"]')?.src);
  console.log('VICTOR:', victorImg);

  // GCE
  await page.goto('https://esab.com/tr/eur_tr/brands/esab-family-brands/gce/');
  const gceImg = await page.evaluate(() => document.querySelector('img[src*="gce"]')?.src);
  console.log('GCE:', gceImg);

  await browser.close();
})();
