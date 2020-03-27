      var map;
      var src = 'https://csunix.mohawkcollege.ca/~000349779/RMHCSCO/DATA/WARDS.kml';

      function initMap() {
          // create the map
          map = new google.maps.Map(document.getElementById('map'), {
              center: new google.maps.LatLng(43.2609686, -80.2133423),
              zoom: 11,
              mapTypeId: 'terrain'
          });

          var geoJsonData = map.data.loadGeoJson('data/Ward_Boundaries.json');

          console.log(geoJsonData);

          fetch('data/Ward_Boundaries.json')
              .then(response => response.text())
              .then((data) => {
                  console.log(data)
                  map.data.addGeoJson(data);
              })

          map.data.setStyle(function (feature) {
              var SD_NAME = feature.getProperty('WARD');
              var color = "gray";
              if (SD_NAME == "1") {
                  color = "red";
              }
              return {
                  fillColor: color,
                  strokeWeight: 1
              }
          });

          console.log('mao');

      }



      //   // load the kml data from the source 
      //   var kmlLayer = new google.maps.KmlLayer(src, {
      //       suppressInfoWindows: true,
      //       preserveViewport: false,
      //       map: map
      //   });
      //   // add listener to show ward information onclick
      //   kmlLayer.addListener('click', function (event) {
      //       var content = event.featureData.infoWindowHtml;
      //       var testimonial = document.getElementById('sidebar');
      //       testimonial.innerHTML = content;
      //   });