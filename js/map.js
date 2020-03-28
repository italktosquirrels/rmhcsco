      var map;
      var src = 'https://csunix.mohawkcollege.ca/~000349779/RMHCSCO/DATA/WARDS.kml';

      function initMap() {
          // create the map
          map = new google.maps.Map(document.getElementById('map'), {
              center: new google.maps.LatLng(43.18942350279689, -79.88746830920266),

              zoom: 10.7,
              mapTypeId: 'terrain'
          });

          //Loads Image Marker for Ronald McDonald House
          var image = '../css/images/logo-house-rmhcswo.svg';
          var beachMarker = new google.maps.Marker({
              position: {
                  lat: 43.258030,
                  lng: -79.922913
              },
              map: map,
              //   icon: image
          });

          var geoJsonData = map.data.loadGeoJson('data/Ward_Boundaries.json');

          console.log(geoJsonData);

          //   fetch('data/Ward_Boundaries.json')
          //       .then(response => response.text())
          //       .then((data) => {
          //           console.log(data)
          //           map.data.addGeoJson(data);
          //       })

          map.data.setStyle(function (feature) {
              var WARD = feature.getProperty('WARD');
              var color = "gray";
              if (WARD == "1") {
                  color = "red";
              }
              return {
                  fillColor: color,
                  strokeWeight: 1
              }
          });




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