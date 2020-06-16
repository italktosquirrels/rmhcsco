var map;
var lat_lng = {
    lat: 43.258030,
    lng: -79.922913
};

var metrics;
var infowindow;

function initMap() {
    // create the map
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(lat_lng),
        zoom: 11,
        mapTypeId: 'terrain'
    });

    var geoJsonData = map.data.loadGeoJson('data/Ward_Boundaries.json');


    setMapStyle();


    //RMHSCO LOCATION AND MARKER
    var image = 'img/rmhcsco_map_icon.png';
    var rmhcscoMarker = new google.maps.Marker({
        position: {
            lat: 43.258030,
            lng: -79.922913
        },
        map: map,
        icon: image,
        title: 'RMHCSCO'
    });


    //Increase Border Stroke Width on Hover
    map.data.addListener('mouseover', function (event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {
            strokeWeight: 3.5
        });
        // console.log(event.feature.getProperty('OBJECTID'));
    });

    //Revert to Original Border Stroke Width on MouseOut
    map.data.addListener('mouseout', function (event) {
        map.data.revertStyle();
    });

    infoWindow();

    // metricsCall();

    // setInterval(metricsCall, 5000);




}

function infoWindow() {
    map.data.addListener('click', function (event) {

        closeInfoWindow();

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
        var geometry = event.feature.getGeometry('coordinates');

        var bounds = new google.maps.LatLngBounds();
        map.data.forEach(function (feature) {
            event.feature.getGeometry().forEachLatLng(function (latlng) {
                bounds.extend(latlng);
            });
        });



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

        //Highlights Side Bar  
        $(".sidebar-col-grid").each(function () {

            $(this).css('background-color', '#353534');
            var wardNumberSideBar = $(this).attr('ward');
            var colour = $(this).css('border-left-color');


            if (wardNumberSideBar == ward) {

                $(this).css('background-color', colour);
                $(this).css('border', '1px solid' + colour);
            }
        });
    });
}

function closeInfoWindow() {
    if (infowindow) {
        infowindow.close();
    }
}

function setMapStyle(strokeweight) {

    map.data.setStyle(function (feature) {
        var WARD = feature.getProperty('WARD');
        var color = "red";
        switch (WARD) {

            case "1":
                color = "rgba(72, 114, 173, 1)";
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

$(document).ready(function () {
    console.log("READY");


    $("#sidebar-col").hover(function () {
        // console.log("HOVER");
        $(".sidebar-col-grid").css('cursor', 'pointer');
        $(".sidebar-col-grid").click(function () {

            var ward = $(this).attr('ward');

            var greyBackground = 'rgb(53, 53, 52)';
            var colour = $(this).css('border-left-color');
            $(".sidebar-col-grid").each(function () {
                if (!$(".sidebar-col-grid").css('background-color', greyBackground)) {
                    $(".sidebar-col-grid").css('background-color', greyBackground)
                }

            });

            $(this).css('background-color', colour);
            $(this).css('border', '1px solid' + colour);

            closeInfoWindow();

            map.data.setStyle(function (feature) {
                var WARD = feature.getProperty('WARD');
                var color = "red";
                if (ward == WARD) {
                    switch (WARD) {

                        case "1":
                            color = "rgba(72, 114, 173, 1)";
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
                        strokeWeight: 3.5
                    }
                } else {
                    switch (WARD) {

                        case "1":
                            color = "rgba(72, 114, 173, 1)";
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
                }

            });


        });
    });






});