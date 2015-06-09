$(document).ready(initialize);
var map;

function initialize() {
    var mapCanvas = document.getElementById('map-canvas');
		var mapOptions = {
			center: new google.maps.LatLng(54.89852, 23.90360),
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
	var map = new google.maps.Map(mapCanvas, mapOptions);
}


$.getJSON("js/places.txt", function(json1) {
	$.each(json1, function(key, data) {
		var latLng = new google.maps.LatLng(data.lat, data.lng); 
		// Creating a marker and putting it on the map
		var marker = new google.maps.Marker({
		position: latLng,
		title: data.title
	});
	marker.setMap(map);
	});
});

google.maps.event.addDomListener(window, 'load', initialize);



