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

  var populate_active_tab = function(data_from_server, $active_tab) {

    data_from_server["results"].forEach( function(result, index) {
      var panel_to_append = "";

      // Grrrr, the flims collection uses 'title' whereas all other collections use 'name'
      var title_of_panel = result["name"] ? result["name"] : result["title"];

      // Create the Panel for this result
      panel_to_append += '<div class="panel panel-default" id="result_panel"><div class="panel-heading"><h3 class="panel-title">' + title_of_panel + '</h3></div><div class="panel-body"><ul>'

      Object.keys(result).forEach( function(key, index) {
        if ( key != "name" && key != "title" ) {
          if ( Array.isArray(result[key]) ) {
            // The value is an array of links, lets just create a-refs displaying their respective IDs
            panel_to_append += ('<li>' + key + ': ')
            result[key].forEach( function(link_url, index) {
              panel_to_append += ('<a href="' + link_url + '" target="_blank">' + /\d+/.exec(link_url) + '</a>, ');
            });
            // This will slice off the ', ' comma-space from the last list item.
            panel_to_append = panel_to_append.slice(0, -2);
            panel_to_append += '</li>'
          } else {
            panel_to_append += ('<li>' + key + ': ' + result[key] + '</li>');
          };

        };
      });
      panel_to_append += '</ul></div></div>';
      $active_tab.append(panel_to_append);

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

    },

    handle_navbar_click: function() {
      var $active_tab = $(".tab-content .active");
      var url_to_get = $active_tab.data("url");

      // Lets keep the GETs to only if we need them
      if ( $active_tab.children().length == 0 ) {
        $.ajax({
          url: url_to_get,
          type: "GET",
          dataType: "json"
        }).done(function (data_from_server) {
          populate_active_tab(data_from_server, $active_tab);

        }).fail(function () {
          console.log("SWAPI GET Failed");
          $active_tab.append("SWAPI GET Failed!");
        });
      };
    }
  }
})();