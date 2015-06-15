//foursquare API setup

var CLIENT_ID = 'MVNWONOCWS4U43AYD4HY2HRN1UE0VYK52AV3K1OTV1G51MCV';
var CLIENT_SECRET = 'ADNBSGJQVLQWFN0HOAV0ZWV52XZVYTUGGMIMNJEXOIU2I1FH';
var ViewModel;
var Place;

//JSON, AJAX requests

(function requestJSON() {
	ViewModel.createMap();
	var myCoffeePlacesJSON = 'https://api.myjson.com/bins/53qu0';
	// request JSON data for favorite coffee places
	$.ajax({url: myCoffeePlacesJSON,
		success: function(results) {
			var mappedPlaces = $.map(results, function(item) {
				return new Place(item);
			});
			// console.log(mappedPlaces);
			ViewModel.places_array(mappedPlaces);
			$('.coffee-places-list').show();

			// request Foursquare data
			for (var i in mappedPlaces) {
				$.ajax({url: 'https://api.foursquare.com/v2/venues/search?intent=match&limit=1&v=20150515&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&ll=' + mappedPlaces[i].latitude() + ',' + mappedPlaces[i].longitude() + '&query=' + mappedPlaces[i].name(),
					success: function(data) {
						var venueID = data.response.venues[0].id;
						ViewModel.createMarkers(data);
					}
				});
			}
		}
	});
})();

$(document).ajaxError(function() {
	$('.error-popup').show();
});
