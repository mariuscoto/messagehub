///////////////////////////////////////
// node_modules/phantomjs/bin/phantomjs --cookies-file=cookies_wa.txt --ignore-ssl-errors=yes --web-security=no wa.js


var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
  return console.log(msg)
}

page.viewportSize = { width: 600, height: 600 };
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
page.open("https://web.whatsapp.com", function(status) {

  if (status === "success") {
    page.render("wa.png")
  }
});