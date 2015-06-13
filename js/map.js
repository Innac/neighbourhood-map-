var map;
// var markers = [];

var markers = [
  {
    
    "title":"Perkuno al.3a",
    "latitude":"54.89699",
    "longitude":"23.93407", 
    "description":"ffff"
  },{ 
    "id":46,
    "title":"Varniu tiltas",
    "latitude":"54.91446",
    "longitude":"23.90941"
  },{
    "id":44,
    "title":"Smalininku g.7",
    "latitude":"54.89545",
    "longitude":"23.89888"
  },{
    "id":43,
    "title":"Veiveriu g.50",
    "latitude":"54.89202",
    "longitude":"23.89046"
}];

function initialize() {
	// Map options
	// Coffee map styling
	var coffee_styles = [{
			stylers: [{ saturation:0 } ]
			}, {
				featureType:"poi.all",
				elementType:"geometry.fill",
				stylers:[{gamma:1},{color:"#978f86"}]
			},{
				featureType:"poi.all",
				elementType:"labels.text.fill",
				stylers:[{gamma:1},{color:"#ffffff"}]
			},{
				featureType:"poi.all",
				elementType:"labels.text.stroke",
				stylers:[{gamma:1},{color:"#ffffff"},{visibility:"off"}]
			},{
				featureType:"poi.park",
				elementType:"geometry.fill",
				stylers:[{gamma:1},{color:"#878078"}]
			},{
				featureType:"landscape",
				elementType:"geometry.stroke",
				stylers:[{color:"#533b16"},{gamma:1}]
			},{
				featureType:"landscape",
				elementType:"geometry.fill",
				stylers:[{color:"#5e4a2c"},{gamma:1}]
			},{
				featureType:"water",
				elementType:"geometry",
				stylers:[{color:"#6d95be"},{gamma:1}]
			},{
				featureType:"road.local",
				elementType:"geometry",
				stylers:[{color:"#5f6468"},{gamma:1}]
			},{
				featureType:"road.local",
				elementType:"geometry.stroke",
				stylers:[{color:"#5f6468"},{gamma:1}]
			},{
				featureType:"road.local",
				elementType:"labels.text.fill",
				stylers:[{gamma:1},{color:"#ffffff"}]
			},{
				featureType:"road.ocal",
				elementType:"labels.text.stroke",
				stylers:[{gamma:1},{color:"#5f6468"},{visibility:"on"}]
			},{
				featureType:"road.highway",
				elementType:"geometry",
				stylers:[{color:"#7e8285"},{gamma:1}]
			},{
				featureType:"road.highway",
				elementType:"geometry.stroke",
				stylers:[{color:"#7e8285"},{gamma:1}]
			},{
				featureType:"road.highway",
				elementType:"labels.text.fill",
				stylers:[{gamma:1},{color:"#ffffff"}]
			},{
				featureType:"road.highway",
				elementType:"labels.text.stroke",
				stylers:[{gamma:1},{color:"#7e8285"},{visibility:"on"}]
			},{
				featureType:"road.arterial",
				elementType:"geometry",
				stylers:[{color:"#5f6468"},{gamma:1}]
			},{
				featureType:"road.arterial",
				elementType:"geometry.stroke",
				stylers:[{color:"#5f6468"},{gamma:1}]
			},{
				featureType:"road.arterial",
				elementType:"labels.text.fill",
				stylers:[{gamma:1},{color:"#ffffff"}]
			},{
				featureType:"road.arterial",
				elementType:"labels.text.stroke",
				stylers:[{gamma:1},{color:"#5f6468"},{visibility:"on"}]
			},{
				featureType: "road",
				elementType: "labels",
				stylers: [
					{ visibility: "off" }
				]
	}];
	
	var mapOptions = {
		zoom: 12,
		center: new google.maps.LatLng(54.89852, 23.90360),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: coffee_styles
	};

	// Creating the map
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
// }


//Creates infoWindow for map markers
// function placeMarkerInfoWindow(marker){
// 	var infoWindow = new google.maps.InfoWindow();

// 	function createInfoWindow(marker_data) {
// 		/*
// 		* Create the DOM element for the marker window
// 		* Uses marker data to create Business name, phone number, reviewer's picture, and reviewer's review
// 		*/    
// 		var infoWindowContent = '<div class="info_content">';
// 		infoWindowContent += '<h4>' + mk.title + '</h4>';
// 		infoWindowContent += '<p>' + mk.ph + '</p>';
// 		infoWindowContent += '<p class="review"><img src="' + mk.pic + '">' + mk.blurb + '</p>';
// 		infoWindowContent += '</div>';
// 	}

// 	infoWindow.setContent(String(infoWindowContent));
// 	infoWindow.open(map, marker_data);
// };

//Removers map markers and clears markers array
// function removeMapMarkers () {
// 	for(var i = 0; i < markers.length; i++) {
// 		markers[i].setMap(null);
// 	}
// 	markers = [];
// }

// if(allMarkers.length > 0) {
// 	removeMapMarkers();
// };

// Looping through all the markers
for(var i = 0; i < markers.length; i++) {
    // Current object
    var obj = markers[i];
    
    // Adding a new marker for the object
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(obj.latitude,obj.longitude),
      map: map,
      title: obj.title // this works, giving the marker a title with the correct title
    });
    
    // Adding a new info window for the object
    var clicker = addClicker(marker, obj.title);
   
  } // end loop
  
  // Adding a new click event listener for the object
  function addClicker(marker, content) {
    google.maps.event.addListener(marker, 'click', function() {
      if (infowindow) {infowindow.close();}
      infowindow = new google.maps.InfoWindow({content: content});
      infowindow.open(map, marker); 
    });
}
};


// Initialize the map
google.maps.event.addDomListener(window, 'load', initialize);

