<<<<<<< HEAD

=======
<<<<<<< HEAD
>>>>>>> 7f2730de9eb9b9b85bfd8e9c603ecd9742d2232e
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
         switch(SD_NAME){

             case "1":
                   color = "rgba(114, 173, 72, 1)";
                   break;
               case "2":
                   color = "rgba(72, 114, 173, 1)";
                   break;
               case "3":
                   color = "rgba(255, 200, 41, 1)";
                   break;
               case "4":
                   color = "rgba(242, 215, 56, 1)";
                   break;
               case "5":
                   color = "rgba(173, 72, 114, 1)";
                   break;
               case "6":
                   color = "rgba(131, 72, 173, 1)";
                   break;                      
               case "7":
                   color = "rgba(72, 173, 81, 1)";
                    reak;
               case "8":
                   color = "rgba(234, 47, 92, 1)";
                   break;
               case "9":
                   color = "rgba(218, 26, 0, 1)";
                   break;
                case "10":
                   color = "rgba(72, 114, 173, 1)";
                   break;     
               case "11":
                   color = "rgba(72, 173, 131, 1)";
                   break;
               case "12":
                   color = "rgba(81, 72, 173, 1)";
                   break;
               case "13":
                   color = "rgba(173, 72, 165, 1)";
                   break;
               case "14":
                   color = "rgba(247, 147, 30, 1)";
                   break;
               case "15":
                   color = "rgba(72, 165, 173, 1)";
                   break;                        
                    
         }            
         return {
             fillColor: color,
             strokeWeight: 1
         }
     });

     console.log('mao');

 }
<<<<<<< HEAD
=======



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
=======
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
>>>>>>> c0d8f17f632b2a969e4a59568f92e4f28e1acd58
>>>>>>> 7f2730de9eb9b9b85bfd8e9c603ecd9742d2232e
