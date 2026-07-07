const https = require('https');
https.get('https://www.ticabltd.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/<img[^>]*src=["']([^"']*)["'][^>]*logo[^>]*>/i);
    const match2 = data.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i);
    console.log("Ticab img src matching logo:", match ? match[1] : 'none');
    console.log("Ticab og:image:", match2 ? match2[1] : 'none');
  });
});
