///////////////////////////////////////
// node_modules/phantomjs/bin/phantomjs --cookies-file=cookies.txt --ignore-ssl-errors=yes --web-security=no fb.js


var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
  return console.log(msg)
}



page.viewportSize = { width: 600, height: 600 };
//page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:36.0) Gecko/20100101 Firefox/36.0 WebKit';
page.open("http://www.messenger.com", function(status) {

  if (status === "success") {
    // page.evaluate(function() {
    //   document.getElementById("email").value = "cmarius02@yahoo.com";
    //   document.getElementById("pass").value = "mar!usfB07Znn";
    //   document.getElementById("loginbutton").click();
    //   // page is redirecting.
    // });
    setTimeout(function() {
      ceva = page.evaluate(function() {

        var el = document.getElementsByClassName('_3oh-')
        // Skip username and other
        for (var i=3; i<el.length; i++) {
          // Skip name tags
          if (el[i].parentNode.className.indexOf('_ih3') > -1)
            continue
          // Skip time tags
          if (el[i].parentNode.className.indexOf('_497p') > -1)
            continue

          var timestamp = el[i].getAttribute('data-reactid')
          timestamp = timestamp.split('=')[2]

          date = null
          if (timestamp) {
            timestamp = timestamp.slice(1)
            date = new Date(parseInt(timestamp))
          }

          parent = el[i].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('_ih3')[0]
          if (parent) {
            parent = parent.getElementsByClassName('_3oh-')[0]
          }

          console.log(date + ' [' + parent.textContent + '] ' + el[i].textContent)
        }
      })

      // Scroll page to load dynamic content
      page.scrollPosition = {
        top: 300,
        left: 0
      }

      page.render("fb.png");
      phantom.exit();
    }, 5000);
  }
})
