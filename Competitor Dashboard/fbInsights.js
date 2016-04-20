var insights_access_token='CAACEdEose0cBABr5KzbpWWIyYZAv9fxP8cvCTG8tY7blehBDMS1UzivG8fcLLkNY1Puvi4niZBgl98zeWpI3quOb2dmoSU4JZBqEkLEAEoeWbFoUBDk7zgzZC6avPs4oziO7AwTLazVuR8iF0WJkDSsu2fnRF9ZB0z5p6Be1Qwht2KMkfE6ePXl4QGTDQjZBZCxq2Fr2fOz9gZDZD'

function getPageImpressions(insights_access_token, callback) {
	var url = 'https://graph.facebook.com/v2.6/HerCampusMagazine/insights/page_impressions?access_token='+insights_access_token;
	$.getJSON(url, function(json) {
		callback(json.data[0].values);
	})
}

getPageImpressions(insights_access_token, function(d){
	console.log(d);
});