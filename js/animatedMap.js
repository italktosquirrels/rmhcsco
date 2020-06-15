var map;
var directionsService;
var marker = [];
var polyLine = [];
var poly2 = [];
var startLocation = [];
var endLocation = [];
var timerHandle = [];
var infoWindow = null;
var donorWard;
var startingValue = "";

var startLoc = [];
var endLoc = [];

var lastVertex = 1;
var step = 50; // 5; // metres
var eol = [];

var metrics;
var infowindow;
var lat_lng = {
    lat: 43.258030,
    lng: -79.922913
};

//Stores Current Zoom Level of Map
var zoomLevel;

// window.initialize = initialize;
window.setRoutes = setRoutes;

/**
 * Intiaites Google Maps. Takes parameter to set ward location on map
 * @param {*} wardNum 
 */
function initMap(wardNum) {
    // create the map
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(43.258030, -79.922913),
        zoom: 11,
        mapTypeId: 'terrain'
    });

    //RMHSCO LOCATION AND MARKER
    var image = 'img/rmhcsco_map_icon.png';
    var beachMarker = new google.maps.Marker({
        position: {
            lat: 43.258030,
            lng: -79.922913
        },
        map: map,
        icon: image
    });

    // grab the geojson data
    var geoJsonData = map.data.loadGeoJson('data/Ward_Boundaries.json');


    //Fucntion to Set Ward Colours
    setWardColours();

    //Calls Fucntion to set Ward 
    setWard(wardNum);

    //Calls function to get current zoom level on change
    getZoomLevel();


    //Border around boundries
    map.data.addListener('mouseover', function (event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {
            strokeWeight: 3.5
        });
    });

    //Increase Border Stroke on Hover
    map.data.addListener('mouseout', function (event) {
        map.data.revertStyle();
    });

    /* ******************************
         INFO BOX
    ******************************* */

    map.data.addListener('click', function (event) {

        if (infowindow) {
            infowindow.close();
        }

        function metricsCall() {
            return JSON.parse($.ajax({
                url: './php/controller.php',
                type: 'post',
                data: {
                    action: 'metrics'
                },
                dataType: 'json',
                global: false,
                async: false,
                success: function (data) {
                    return data;
                }
            }).responseText);

        }

        metrics = metricsCall();

        var ward = event.feature.getProperty('WARD');
        var i;
        for (i = 0; i < 15; i++) {
            if (ward == metrics.allDonationInfo[i].Ward_ID) {
                var wardName = metrics.allDonationInfo[i].Ward_Name;
                var wardID = metrics.allDonationInfo[i].Ward_ID;
                var wardAmount = metrics.totalByWard[i].Amount;
                var date = new Date(metrics.allDonationInfo[i].Date_Time);
                var amount = metrics.allDonationInfo[i].Amount;

            }
        }
        contents = '<div class="infobox">' +
            '<div class="infobox-title">' +
            '<h1>' + wardName + '</h1>' +
            '</div>' +
            '<div class="infobox-content">' +
            '<p>Ward No. ' + wardID + '</p>' +
            '<p>Total: $' + wardAmount + '.00</p>' +
            '<p style="text-align: center; font-family: Futura Bold;">Last Donation</p>' +
            '<p>' + date.toDateString() + '</p>' +
            '<p>' + date.toLocaleTimeString() + '</p>' +
            '<p>$' + amount + '.00</p>' +
            '</div>' +
            '</div>';

        infowindow = new google.maps.InfoWindow({
            content: contents,
            pixelOffset: new google.maps.Size(-1, -45),
        });

        infowindow.setPosition(lat_lng);
        infowindow.open(map);

    });

}

/**
 * Sets Ward Colours
 */
function setWardColours() {
    // set the ward colours based on geojson coordinates
    map.data.setStyle(function (feature) {
        var WARD = feature.getProperty('WARD');
        var color = "gray";
        switch (WARD) {
            case "1":
                color = "rgba(72, 114, 173, 1)";
                strokeColor = "rgba(72, 114, 173, 1)";
                break;
            case "2":
                color = "rgba(81, 72, 173, 1)";
                break;
            case "3":
                color = "rgba(131, 72, 173, 1)";
                break;
            case "4":
                color = "rgba(173, 72, 165, 1)";
                break;
            case "5":
                color = "rgba(173, 72, 114, 1)";
                break;
            case "6":
                color = "rgba(234, 47, 92, 1)";
                break;
            case "7":
                color = "rgba(218, 26, 0, 1)";
                break;
            case "8":
                color = "rgba(242, 215, 56, 1)";
                break;
            case "9":
                color = "rgba(255, 200, 41, 1)";
                break;
            case "10":
                color = "rgba(114, 173, 72, 1)";
                break;
            case "11":
                color = "rgba(72, 173, 81, 1)";
                break;
            case "12":
                color = " rgba(72, 173, 131, 1)";
                break;
            case "13":
                color = "rgba(72, 165, 173, 1)";
                break;
            case "14":
                color = "rgba(148, 221, 219, 1)";
                break;
            case "15":
                color = "rgba(247, 147, 30, 1)";
                break;

        }
        return {
            fillColor: color,
            strokeColor: color,
            strokeWeight: 1.5
        }
    });
}

/**
 * 
 * @param {} wardNumber 
 */
function setWard(wardNumber) {
    // get the donors ward to start the cart animation from
    // console.log("start set ward with: " + wardNumber); // testing log
    switch (wardNumber) {
        case 1:
            startingValue = "43.2535809,-79.9048477";
            break;
        case 2:
            startingValue = "43.2533545,-79.8713059";
            break;
        case 3:
            startingValue = "43.2513141,-79.8405899";
            break;
        case 4:
            startingValue = "43.2468749,-79.7992347";
            break;
        case 5:
            startingValue = "43.2300028,-79.7760708";
            break;
        case 6:
            startingValue = "43.2080969,-79.8388357";
            break;
        case 7:
            startingValue = "43.2138899,-79.8681587";
            break;
        case 8:
            startingValue = "43.2199659,-79.8928887";
            break;
        case 9:
            startingValue = "43.1878654,-79.7787937";
            break;
        case 10:
            startingValue = "43.2226129,-79.7028177";
            break;
        case 11:
            startingValue = "43.1598979,-79.9272297";
            break;
        case 12:
            startingValue = "43.2097349,-80.0492837";
            break;
        case 13:
            startingValue = "43.3211289,-80.0513307";
            break;
        case 14:
            startingValue = "43.2337239,-79.9187647";
            break;
        case 15:
            startingValue = "43.3803054,-79.9749105";
            break;
    }
    // console.log("end SETWARD"); // testing log
    // call setRoutes with the map and starting LatLong values
    setRoutes(map, startingValue);
}


// creates the animated marker
function createMarker(latlng, url, width, hieght) {
    var cart = {
        url: 'img/happy-wheels-cart-icon.png',
        size: new google.maps.Size(50, 76) // 50 pixels wide x 76 pixels tall
    }
    // using Marker api, marker is created
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        suppressInfoWindows: true,
        icon: cart,
        zIndex: 10
    });

    return marker;
}

// Using Directions Service find the route between the starting and ending points
function setRoutes(map, startingMarker) {
    //map && initialize();
    //var begin = document.getElementById('start');
    var startVal = startingMarker; // the stating LatLong values
    var endVal = 'Ronald McDonald House Charities South Central Ontario';

    startLoc[0] = startVal;
    endLoc[0] = endVal;

    // empty out previous values if any
    startLocation = [];
    endLocation = [];
    polyLine = [];
    poly2 = [];
    timerHandle = [];

    var directionsDisplay = new Array();
    for (var i = 0; i < startLoc.length; i++) {
        var rendererOptions = {
            map: map,
            suppressInfoWindows: true,
            suppressPolylines: true,
            preserveViewport: false
        };

        directionsService = new google.maps.DirectionsService();
        var travelMode = google.maps.DirectionsTravelMode.DRIVING;
        var request = {
            origin: startLoc[i],
            destination: endLoc[i],
            travelMode: travelMode
        };
        directionsService.route(request, makeRouteCallback(i, directionsDisplay[i]), rendererOptions);

    }
}

// called after getting route from directions service, does all the heavylifting
function makeRouteCallback(routeNum, disp, rendererOptions) {
    // check if polyline and map exists, if yes, no need to do anything else, just start the animation
    if (polyLine[routeNum] && (polyLine[routeNum].getMap() != null)) {
        startAnimation(routeNum);
        return;
    }
    return function (response, status) {
        // if directions service successfully returns and no polylines exist already, then do the following
        if (status == google.maps.DirectionsStatus.ZERO_RESULTS) {
            toggleError("No routes available for selected locations");
            return;
        }
        if (status == google.maps.DirectionsStatus.OK) {

            startLocation[routeNum] = new Object();
            endLocation[routeNum] = new Object();

            // set up polyline for current route
            polyLine[routeNum] = new google.maps.Polyline({
                path: [],
                strokeColor: '#FF0000',
                strokeOpacity: 0.0000000001,
                strokeWeight: 0
            });
            poly2[routeNum] = new google.maps.Polyline({
                path: [],
                strokeColor: '#FF0000',
                strokeOpacity: 0.000000000001,
                strokeWeight: 0
            });
            // For each route, display summary information.
            var legs = response.routes[0].legs;
            // directionsrenderer renders the directions obtained previously by the directions service
            disp = new google.maps.DirectionsRenderer(rendererOptions);

            // if true, hides the A/B pointer markers
            disp.setOptions({
                suppressMarkers: true
            });
            // if true, hides the polyline while still driving on the route (does not delete)
            disp.setOptions({
                suppressPolylines: false
            });

            disp.setMap(map);
            disp.setDirections(response);

            // create Markers
            for (i = 0; i < legs.length; i++) {
                // for first marker only
                if (i == 0) {
                    startLocation[routeNum].latlng = legs[i].start_location;
                    startLocation[routeNum].address = legs[i].start_address;
                    marker[routeNum] = createMarker(legs[i].start_location, "Happy Wheels Cart", legs[i].start_address, "green");
                }
                endLocation[routeNum].latlng = legs[i].end_location;
                endLocation[routeNum].address = legs[i].end_address;
                var steps = legs[i].steps;
                for (j = 0; j < steps.length; j++) {
                    var nextSegment = steps[j].path;
                    for (k = 0; k < nextSegment.length; k++) {
                        polyLine[routeNum].getPath().push(nextSegment[k]);
                    }
                }
            }
        }
        if (polyLine[routeNum]) {
            startAnimation(routeNum);
        }

    }
}

// Spawn a new polyLine every 20 vertices
function updatePoly(i, d) {
    if (poly2[i].getPath().getLength() > 20) {
        poly2[i] = new google.maps.Polyline([polyLine[i].getPath().getAt(lastVertex - 1)]);
    }

    if (polyLine[i].GetIndexAtDistance(d) < lastVertex + 2) {
        if (poly2[i].getPath().getLength() > 1) {
            poly2[i].getPath().removeAt(poly2[i].getPath().getLength() - 1)
        }
        poly2[i].getPath().insertAt(poly2[i].getPath().getLength(), polyLine[i].GetPointAtDistance(d));
    } else {
        poly2[i].getPath().insertAt(poly2[i].getPath().getLength(), endLocation[i].latlng);

    }
}



// updates marker position to make the animation and update the polyline
function animate(index, d, tick) {
    //Checks to see if Route is Finsished
    if (d > eol[index]) {
        marker[index].setPosition(endLocation[index].latlng);
        marker[0].visible = false;
        firworks();
        setZoomLevel(11.5, 43.258030, -79.922913)

        console.log(marker[0].visible);
        return;
    }

    var p = polyLine[index].GetPointAtDistance(d);
    marker[index].setPosition(p);
    updatePoly(index, d);


    switch (zoomLevel) {

        case 11:
            timerHandle[index] = setTimeout("animate(" + index + "," + (d + step) + ")", tick || 10);
            break;
        case 12:
            timerHandle[index] = setTimeout("animate(" + index + "," + (d + step) + ")", tick || 15);
            break;
        case 13:
            timerHandle[index] = setTimeout("animate(" + index + "," + (d + step) + ")", tick || 20);
            break;
        case 14:
            timerHandle[index] = setTimeout("animate(" + index + "," + (d + step) + ")", tick || 50);
            break;
        case 15:
            timerHandle[index] = setTimeout("animate(" + index + "," + (d + step) + ")", tick || 100);
            break;
        case 16:
            timerHandle[index] = setTimeout("animate(" + index + "," + (d + step) + ")", tick || 100);
            break;
        default:
            timerHandle[index] = setTimeout("animate(" + index + "," + (d + step) + ")", tick || 100);
            break;

    }

}

// start marker movement by updating marker position every x milliseconds i.e. tick value
function startAnimation(index) {

    if (timerHandle[index])
        clearTimeout(timerHandle[index]);
    eol[index] = polyLine[index].Distance();
    map.setCenter(polyLine[index].getPath().getAt(0));
    //DOES THIS EVEN WORK?
    map.setZoom(11);
    console.log("CENTRE" + polyLine[index].getPath().getAt(0))

    poly2[index] = new google.maps.Polyline({
        path: [polyLine[index].getPath().getAt(0)],
        strokeColor: "#FFFF00",
        strokeWeight: 0
    });

    timerHandle[index] = setTimeout("animate(" + index + ",10)", 500); // Allow time for the initial map display

}

/**
 * Function that gets the current Zoom Level on the map
 */
function getZoomLevel() {
    google.maps.event.addListener(map, 'zoom_changed', function () {
        zoomLevel = map.getZoom();
        // console.log(zoomLevel);
    });

}

/**
 * Function that gets the current Zoom Level on the map
 */
function setZoomLevel(zoomLevel, lat, lng) {
    var centre = new google.maps.LatLng(lat, lng);
    map.setCenter(centre);
    map.setZoom(zoomLevel);
}

function firworks() {
    var myCanvas = document.createElement('canvas');
    // document.appendChild(myCanvas);

    var myConfetti = confetti.create(myCanvas, {
        resize: true,
        useWorker: true
    });
    myConfetti({
        particleCount: 100,
        spread: 160
        // any other options from the global
        // confetti function
    });

    var count = 200;
    var defaults = {
        origin: {
            y: 0.7
        }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });

    var end = Date.now() + (3 * 1000);

    // go Buckeyes!
    var colors = ['#bb0000', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: {
                x: 0
            },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: {
                x: 1
            },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}