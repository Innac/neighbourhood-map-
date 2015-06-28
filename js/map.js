
// object to create list
var Place = function(data) {
  	'use strict';
	this.name = ko.observable(data.name);
	this.latitude = ko.observable(data.lat);
	this.longitude = ko.observable(data.lng);
	this.picture = ko.observable(data.img);
	this.display = ko.observable(true);
};


// viewModel
var ViewModel = {
	filterTerm: ko.observable(''),
	places_array: ko.observableArray([]),
	map: ko.observable(),
	infoWindow: ko.observable(),
	markersArray: ko.observableArray([]),
	companyName: ko.observable(''),
	companyAddress: ko.observable(''),
	companyCity: ko.observable(''),
	companyWebsite: ko.observable(''),
	companyPhone: ko.observable(''),
	marker: ko.observable(),
	display: ko.observable(true)
};

//for the bouncing Markers
var current=null;

// filter list items
ViewModel.filter = function() {
  	'use strict';
	// convert input values to lowercase
	var typedValue = ViewModel.filterTerm().toLowerCase();
	var pa = ViewModel.places_array();
	$('.coffee-places-list').css('display', 'block'); // show places div

	// iterate through places_array
	for (var i = 0; i < pa.length; i++) {
		// shows or hides list item(s)
		pa[i].display(pa[i].name().toLowerCase().search(typedValue) > -1);
	}

	// check to see if all children in places div are not visible
	if ($('.coffee-places-list').children(':visible').length === 0) {
		$('.coffee-places-list').css('display', 'none'); // if no children are visible stop showing places div
	}
};


// filter map markers
ViewModel.filterMarkers = function() {
  	'use strict';
	// convert input values to lowercase
	var typedValue = $('.search_box').val().toLowerCase();
	var vm = ViewModel;
	var ma = vm.markersArray();

	// iterate through markersArray created in createMarkers function
	for (var i = 0; i < ma.length; i++) {
		// convert name in list item to lowercase; search for input values
		if (ma[i].title.toLowerCase().search(typedValue) > -1) {
			ma[i].setVisible(true);	// show map marker(s)
		} else {
			ma[i].setVisible(false);	// hide map marker(s)
		}
	}
};


// create map, markers, and instance of infowindow
ViewModel.createMap = function() {
	'use strict';
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
				stylers:[{color:"#4f4028"},{gamma:1}]
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

    var myOptions = {
        zoom: 14,
        center: new google.maps.LatLng(54.89852, 23.90360), // center of Kaunas
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl : false, //turns off satellite map view
        styles: coffee_styles
    };

    ViewModel.map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);


   $('.coffee-places').show();
};


// create map markers and information
ViewModel.createMarkers = function(data, images) {
  	'use strict';
	var venue = data.response.venues[0];
	var latlng = new google.maps.LatLng(venue.location.lat, venue.location.lng);
	var bean = 'img/bean.png';

	ViewModel.marker = new google.maps.Marker({
		position: latlng,
		map: ViewModel.map,
		title: venue.name,
		display: this.display,
		animation: google.maps.Animation.DROP,
		icon: bean,
		image: images,
		html: 	'<div class="cards-left">' +
				'<h1 class="name">'+ venue.name + '</h1>' +
				'<p class="category">' + venue.categories[0].name + '</p>' +
				'<p class="address">' + venue.location.formattedAddress[0] + '</p>' +
				'<p class="address">' + venue.location.formattedAddress[1] + '</p>' +
				'<p class="phone">' + venue.contact.formattedPhone + '</p>' +
				'<a class="website truncate" href=' + venue.url + '><span class="truncate">' + venue.url + '</span></a>' +
				'</div>'
	});

	ViewModel.markersArray.push(ViewModel.marker);

	// Add places info to the list
	google.maps.event.addListener(ViewModel.marker, 'click', function() {
		$('.place-info').empty();
		$('.place-info').append(this.html);
		$('.place-info').show();
	});

	//Make the markers bounce
	google.maps.event.addListener(ViewModel.marker, 'click', function(){
		if (current != null)
			current.setAnimation(null);

		if (this.setAnimation() == null) {
			current = this;
			this.setAnimation(google.maps.Animation.BOUNCE);
		} else {
			this.setAnimation(null);
		}
	});

};


// retrieve information from markersArray
// append information to html document
ViewModel.pullData = function(d) {
  	'use strict';
	var text = $(d).text();

	$('.place-info').empty();

	$.map(ViewModel.markersArray(), function(value, key) {
		if (value.title.indexOf(text) > -1) {
			$('.place-info').append(value.html);
		}
	});

	$('.place-info').show();
};


// resize google maps on resize
google.maps.event.addDomListener(window, 'resize', function() {
    var center = ViewModel.map.getCenter();

 	google.maps.event.trigger(ViewModel.map, "resize");
 	ViewModel.map.setCenter(center);
});


ko.applyBindings(ViewModel);