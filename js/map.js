function initMap() {
    var mapStyles = [{
            "elementType": "geometry",
            "stylers": [{
                "color": "#303131"
            }]
        },
        {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#757575"
            }]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#212121"
            }]
        },
        {
            "featureType": "administrative",
            "stylers": [{
                "visibility": "simplified"
            }]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [{
                "color": "#757575"
            }]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "color": "#bdbdbd"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": [{
                    "lightness": 25
                },
                {
                    "visibility": "simplified"
                },
                {
                    "weight": 1
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.stroke",
            "stylers": [{
                    "color": "#3d3d3d"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "administrative.neighborhood",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "landscape",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "poi",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#8a8a8a"
            }]
        },
        {
            "featureType": "road.arterial",
            "stylers": [{
                "visibility": "simplified"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#373737"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffb438"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [{
                "color": "#4e4e4e"
            }]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffb437"
            }]
        },
        {
            "featureType": "road.local",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "transit",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "transit.station.airport",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "water",
            "elementType": "geometry.stroke",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [{
                "visibility": "off"
            }]
        }
    ];


    var mapOptions = {
        zoom: 9,
        center: new google.maps.LatLng(55.6468, 37.581),
        styles: mapStyles,
        backgroundColor: 'hsla(0, 0%, 0%, 0)',
        disableDefaultUI: true
    };

    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
