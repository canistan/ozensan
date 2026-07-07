const https = require('https');
const url = 'https://duckduckgo.com/html/?q=victor+gas+equipment+logo';
https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    const urls = body.match(/https?:\/\/[^"'\s]+\.(png|jpg|svg)/ig);
    console.log(urls ? urls.slice(0, 5) : 'none');
  });
});
