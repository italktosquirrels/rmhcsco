      var map;
      var src = 'https://csunix.mohawkcollege.ca/~000349779/RMHCSCO/DATA/WARDS.kml';

      function initMap() {
          // create the map
        map = new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(43.2609686,-80.2133423),
          zoom: 10,
          mapTypeId: 'terrain'
        });

          // load the kml data from the source 
        var kmlLayer = new google.maps.KmlLayer(src, {
          suppressInfoWindows: true,
          preserveViewport: false,
          map: map
        });
          // add listener to show ward information onclick
        kmlLayer.addListener('click', function(event) {
          var content = event.featureData.infoWindowHtml;
          var testimonial = document.getElementById('sidebar');
          testimonial.innerHTML = content;
        });
      }