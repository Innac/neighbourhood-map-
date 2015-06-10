// $(document).ready(initialize);
// var map;

// function initialize() {
//     var mapCanvas = document.getElementById('map-canvas');
// 		var mapOptions = {
// 			center: new google.maps.LatLng(54.89852, 23.90360),
// 			zoom: 14,
// 			mapTypeId: google.maps.MapTypeId.ROADMAP
// 		}
// 	var map = new google.maps.Map(mapCanvas, mapOptions);
// }
// google.maps.event.addDomListener(window, 'load', initialize);


var map;

// The JSON data
var json = [
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
  
  // Giving the map som options
  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(54.89852, 23.90360),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  // Creating the map
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
  
  // Looping through all the entries from the JSON data
  for(var i = 0; i < json.length; i++) {
    
    // Current object
    var obj = json[i];

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
}

// Initialize the map
google.maps.event.addDomListener(window, 'load', initialize);

