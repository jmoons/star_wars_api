$(document).ready(function() {
  $.ajax({
    url: "http://swapi.co/api/",
    type: "GET",
    dataType: "json"
  }).done(function (data_from_server) {
    // Aaaaand away we go
    SWAPIDemo.initializeSWAPI(data_from_server);
  }).fail(function () {
    console.log("SWAPI GET Failed");
  });

  // Click Handler for Tab Bar
  $("#navbar").on( "shown.bs.tab", function(event) {
    SWAPIDemo.handle_navbar_click();
  })
});

var SWAPIDemo = (function() {

  var populate_active_tab = function() {
    var active_tab = $(".tab-content .active")
    var url_to_get = active_tab.data("url");

    // Clear out the tab
    active_tab.empty();

    $.ajax({
      url: url_to_get,
      type: "GET",
      dataType: "json"
    }).done(function (data_from_server) {
      active_tab.append(JSON.stringify(data_from_server));
    }).fail(function () {
      console.log("SWAPI GET Failed");
      active_tab.append("SWAPI GET Failed!");
    });
  }

  return {
    initializeSWAPI: function(data_from_server) {
      SWAPIDemo.data_structure  = data_from_server;

      Object.keys(data_from_server).forEach( function( key, index ) {
        var index_plus_one = index + 1;
        $("#navbar").append('<li> <a href="#swapi_' + index_plus_one + '" data-toggle="tab">' + key + '</a></li>');
        $(".tab-content").append('<div class="tab-pane" id=swapi_' + index_plus_one + ' data-url="' + SWAPIDemo.data_structure[key] + '"></div>');
      });
      $("#navbar li:first").addClass("active");
      $(".tab-content div:first").addClass("active");

      populate_active_tab();

    },

    handle_navbar_click: function() {
      populate_active_tab();
    }
  }
})();