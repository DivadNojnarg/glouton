$(document).on('shiny:connected', function(event) {
  function sendCookies(id){
    var res = Cookies.get();
    Shiny.setInputValue(id + "-gloutoncookies", res, {priority: "event"});
  }

  sendCookies();

  Shiny.addCustomMessageHandler('fetchcookie', function(arg) {
    var res = Cookies.get(arg.name);
    Shiny.setInputValue(arg.ns + "-gloutoncookie", res, {priority: "event"});
  });

  Shiny.addCustomMessageHandler('fetchcookies', function(arg) {
    sendCookies(arg.ns);
  });

  Shiny.addCustomMessageHandler('addcookie', function(arg) {
    Cookies.set(arg.name, arg.value);
    sendCookies();
  });

  Shiny.addCustomMessageHandler('rmcookie', function(arg) {
    Cookies.remove(arg);
    sendCookies();
  });


});
