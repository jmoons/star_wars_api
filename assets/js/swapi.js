$(document).ready(function() {
  $.ajax({
    url: "http://swapi.co/api/",
    type: "GET",
    dataType: "json"
  }).done(function (data_from_server) {
    SWAPIDemo.initializeSWAPI(data_from_server);
  }).fail(function () {
    console.log("SWAPI GET Failed");
  });
});

var SWAPIDemo = (function() {
  var myUnexposedFunction = function() {
    return "WOW MAN!!!!!!!!!!!!!";
  }

  return {
    initializeSWAPI: function(data_from_server) {
      SWAPIDemo.data_structure  = data_from_server;
      SWAPIDemo.keys            = Object.keys(data_from_server);
    },
    myExposedFunction: function() {
      var output = myUnexposedFunction();
      console.log(output);
    },
  }
})();