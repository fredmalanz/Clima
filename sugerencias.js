//Change this to your access token
      var locationiqKey = "pk.cbd53e4615a1e78fd9d71d5ce6e08ee4"

      $('#busqueda').autocomplete({
        minChars: 3,
        deferRequestBy: 250,
        serviceUrl: 'https://api.locationiq.com/v1/autocomplete',
        paramName: 'q',
        params: {
          // The input parameters to the API goes here
          key: locationiqKey,
          format: "json",
          limit: 3
        },
        ajaxSettings: {
          dataType: 'json'
        },
        formatResult: function(suggestion, currentValue) {
          // Current value is the input query. We can use this to highlight the search phrase in the result
          var format = "<div class='autocomplete-suggestion-name'>" + highlight(suggestion.data.display_place, currentValue) + "</div>" +
            "<div class='autocomplete-suggestion-address'>" + highlight(suggestion.data.display_address, currentValue) + "</div>"
          return format;
        },
        transformResult: function(response) {
          var suggestions = $.map(response, function(dataItem) {
            return {
              value: dataItem.display_name,
              data: dataItem
            };
          })

          return {
            suggestions: suggestions
          };
        },
        onSelect: function(suggestion) {
          displayLatLon(suggestion.data.display_name, suggestion.data.lat, suggestion.data.lon);
        }
      });

      // For triggering reset
      $("#reset-autocomplete").click(function() {
        $('#busqueda').val("");
      });
     

      function highlight(text, focus) {
        var r = RegExp('(' + escapeRegExp(focus) + ')', 'gi');
        return text.replace(r, '<strong>$1</strong>');
      }

      function escapeRegExp(str) {
        return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
      }