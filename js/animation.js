var map;
var directionsService;
var marker = [];
var polyLine = [];
var poly2 = [];
var startLocation = [];
var endLocation = [];
var timerHandle = [];
var infoWindow = null;

var startLoc = [];
var endLoc = [];

var lastVertex = 1;
var step = 50; // 5; // metres
var eol = [];

window.initialize = initialize;
window.setRoutes = setRoutes;

// called on body load
function initialize() {

    var options = {
        // max zoom
        zoom: 18
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), options);
    
    
    // initial location which loads up on map
    address = 'Hamilton, ON'

    // Geocoder is used to encode or actually geocode textual addresses to lat long values
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function (results, status) {
        map.fitBounds(results[0].geometry.viewport);
    });

}

// returns the animated marker
function createMarker(latlng, label, html) {
    var contentString = '';
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

// returns the house marker. NOT WORKING
function createHouseMarker() {
    var cart = {
        url: '../css/images/logo-house-rmhcswo.svg',
        size: new google.maps.Size(50, 76) // 50 pixels wide x 76 pixels tall
    }
    // using Marker api, marker is created
    var marker = new google.maps.Marker({
        position: {
            lat: 43.258030,
            lng: -79.922913
        },
        map: map,
        suppressInfoWindows: true,
        icon: cart
    });
    console.log("house marker log");
    return marker;
}


// Using Directions Service find the route between the starting and ending points
function setRoutes() {
    map && initialize();
    var begin = document.getElementById('start');
    var startVal = begin.value; 
    var endVal = 'Ronald McDonald House Charities South Central Ontario';

    startLoc[0] = startVal;
    endLoc[0] = endVal;
    
    // empty out previous values
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
        if (status == google.maps.DirectionsStatus.ZERO_RESULTS){
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
            disp.setOptions( { suppressMarkers: true } );
            // if true, hides the polyline while still driving on the route (does not delete)
            disp.setOptions( { suppressPolylines: false } );
            
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
                console.log("here");
                createHouseMarker();
            }
        }
        if (polyLine[routeNum]){
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
    if (d > eol[index]) {
        marker[index].setPosition(endLocation[index].latlng);
        return;
    }
    var p = polyLine[index].GetPointAtDistance(d);
    marker[index].setPosition(p);
    updatePoly(index, d);
    timerHandle[index] = setTimeout("animate(" + index + "," + (d + step) + ")", tick || 100);
}

// start marker movement by updating marker position every x milliseconds i.e. tick value
function startAnimation(index) {
    if (timerHandle[index]) 
        clearTimeout(timerHandle[index]);
    eol[index] = polyLine[index].Distance();
    map.setCenter(polyLine[index].getPath().getAt(0));

    poly2[index] = new google.maps.Polyline({
        path: [polyLine[index].getPath().getAt(0)],
        strokeColor: "#FFFF00",
        strokeWeight: 0
    });
    timerHandle[index] = setTimeout("animate(" + index + ",10)", 500);  // Allow time for the initial map display
}