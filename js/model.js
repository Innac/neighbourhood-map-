//foursquare API setup

var CLIENT_ID = 'MVNWONOCWS4U43AYD4HY2HRN1UE0VYK52AV3K1OTV1G51MCV';
var CLIENT_SECRET = 'ADNBSGJQVLQWFN0HOAV0ZWV52XZVYTUGGMIMNJEXOIU2I1FH';
var ViewModel;
var coffee_place;

//JSON, AJAX requests

(function requestJSON(){
	ViewModel.createMap();
	var urlStart = 'https://api.foursquare.com/v2/venues/search?';
	var clientID = '?client_id=' + CLIENT_ID;
	var clientSecret = '&clientSecret=' + CLIENT_SECRET;
	var userLatLng = '&ll=' + 54.8 + ',' + 23.9;
	var query  = '&query=coffee';
	var foursquareURL = urlStart + clientID + clientSecret + userLatLng + query;
	console.log(foursquareURL);


	https://api.foursquare.com/v2/venues/search
  ?client_id=CLIENT_ID
  &client_secret=CLIENT_SECRET
  &v=20130815
  &ll=40.7,-74
  &query=sushi

	//request JSON data for coffee places
	$.ajax({url: foursquareURL})
});