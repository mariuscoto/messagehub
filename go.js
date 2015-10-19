// var page = require('webpage').create();
// var system = require('system')
// var url = 'http://hangouts.google.com';


// page.onResourceError = function(resourceError) {
//     page.reason = resourceError.errorString;
//     page.reason_url = resourceError.url;
// };

// page.viewportSize = { width: 600, height: 600 };
// page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36';

// page.onConsoleMessage = function(msg) {
//   system.stderr.writeLine( 'console: ' + msg );
// };



// page.open(url, function (status) {

//   if (status !== 'success') {
//     console.log(
//       "Error opening url \"" + page.reason_url
//       + "\": " + page.reason
//     );
//     phantom.exit(1)

//   } else {
//     console.log('pas0: ####')

//     page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
//       href = ''
//       href = page.evaluate(function() {
//         console.log('###')

//         return $("#gb_70").attr('href')
//         //console.log('pas1: ' + href)

//         //$("#gb_70").click()
//         // page is redirecting.
//       })

//       console.log('pas2: ' + href)
//       setTimeout(function () {
//         page.open(href, function (status) {
//           setTimeout(function () {
//             //page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
//               page.evaluate(function() {
//                 document.getElementById("Email").value = 'cmarius02@gmail.com'
//                 document.getElementById("next").click()
//                 // $("#Email").value = 'ceva'
//                 // $("#next").click()
//               })
//               do { phantom.page.sendEvent('mousemove'); }
//               while (page.evaluate(function() {return document.getElementById("Email").style.visibility == "visible"}));
//               setTimeout(function () {
//                 page.render('output.png')
//               }, 3000)
//             //})
//             phantom.exit()
//           }, 5000)
//         })
//       }, 5000)

//       //phantom.exit();
//     })


//   }
// })




var confirmPermissions, debug, jqueryURI, page, system;
page = require('webpage').create();
system = require('system');
debug = true;

jqueryURI = "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js";

if (debug) {
  page.onConsoleMessage = function(msg) {
    return console.log(msg);
  };
  page.onAlert = function(msg) {
    return console.log(msg);
  };
}

page.onUrlChanged = function(url) {
  var followUpURI;
  if (/settings\/account/.test(url)) {
    console.log("logged in " + system.args[1]);
    followUpURI = system.args[3];
    return setTimeout(function() {
      return confirmPermissions(followUpURI);
    }, 1);
  }
};

//url = "https://accounts.google.com/ServiceLogin?service=talk&passive=1209600&continue=https://talkgadget.google.com/&followup=https://talkgadget.google.com/"
url = "https://accounts.google.com/ServiceLogin"
page.open(url, function(status) {
  if (status === "success") {
    page.includeJs(jqueryURI, function() {
      return page.evaluate(function(username, password) {
        $("input").each(function() {
          return console.log("input", $(this).attr("type"), this.id, this.name, $(this).val());
        });
        $("input[type=email]").val(username);
        $("#next").click();
        $("input[type=password]").val(password);
        $('#signIn').click()
        //return $("#signIn").click();
        //return $("input[type=submit]").click();
      }, 'marius@rosedu.org', 'mar!usrsD07Znn');
    });
    return setTimeout(function() {
      page.render("timeout.png");
      console.log("TIMEOUT! See timeout.png.");
      return phantom.exit(1);
    }, 20000);
  } else {
    console.log("... fail! Check the $PWD?!");
    return phantom.exit(1);
  }
});

confirmPermissions = function(uri) {
  var confirmPage;
  console.log("navigating to: " + uri);
  confirmPage = require('webpage').create();
  confirmPage.onConsoleMessage = function(msg) {
    return console.log(msg);
  };
  confirmPage.onAlert = function(msg) {
    return console.log(msg);
  };
  confirmPage.onUrlChanged = function(url) {
    return console.log("*NEW* confirm url " + url);
  };
  return confirmPage.open(uri, function(status) {
    var pos;
    console.log(status);
    if (status !== "success") {
      console.log("page failed to load, see fail.png");
      confirmPage.render("fail.png");
      phantom.exit(1);
    }
    pos = null;
    confirmPage.includeJs(jqueryURI, function() {
      return pos = confirmPage.evaluate(function() {
        var button, height, left, ref, ref1, top, width;
        $("button").each(function() {
          return console.log("button", $(this).attr("type"), this.id, this.name, $(this).val());
        });
        button = $('#submit_approve_access').first();
        ref = button.offset(), left = ref.left, top = ref.top;
        ref1 = [button.width(), button.height()], width = ref1[0], height = ref1[1];
        return {
          x: Math.round(left + width / 2),
          y: Math.round(top + height / 2)
        };
      });
    });
    return setTimeout(function() {
      console.log("approving by clicking at", pos.x, pos.y);
      return confirmPage.sendEvent('click', pos.x, pos.y);
    }, 2000);
  });
};

