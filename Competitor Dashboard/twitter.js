/**
token = '1486245986-nwqzW414I9CvVyHfpAksoZW1gz95tAnv3zoCJNP'
getTwitterFollowers(token, 'dango_ramen').then(followers => {
	console.log(followers); // "User Objects" array https://dev.twitter.com/overview/api/users
});



getTwitterFollowers(token, 'jsunderhood').then(followers => {
  console.log(followers); // "User Objects" array https://dev.twitter.com/overview/api/users
});

$(function(){
    $.ajax({
        url: 'http://api.twitter.com/1/users/show.json',
        data: {screen_name: 'rilwis'},
        dataType: 'jsonp',
        success: function(data) {
            $('#followers').html(data.followers_count);
        }
    });
});

var Twitter = require('twitter');

//Callback functions
var error = function(err, response, body) {
	console.log('ERROR [%s]', err);
};
var success = function(data) {
	console.log('Data [%s]', data);
};

//var Twitter = require('twitter-js-client').Twitter;
//var Twitter=require('../lib/twitter.js')
//Get this data from your twitter apps dashboard
var config = {
	"consumerKey": "uwAcM2cGOqcuslNIFHgYoyJRL",
	"consumerSecret": "aV03HYizmS1vmMJ5dZROeVVcXQWGMiq48CsTgFGCZK1xiahRBx",
	"accessToken": "1486245986-nwqzW414I9CvVyHfpAksoZW1gz95tAnv3zoCJNP",
	"accessTokenSecret": "JlBa1Fewyhk6S4sLw9I4D5GEOTI849gL8TShPQVeUlV5l",
	//"callBackUrl": "XXX"
}

var twitter = new Twitter(config);

twitter.getUserTimeline({
	screen_name: 'HerCampus',
	count: '10'
}, error, success);
**/

// Tiny object for getting counts
var socialGetter = (function() {
	/* just a utility to do the script injection */
	function injectScript(url) {
		var script = document.createElement('script');
		script.async = true;
		script.src = url;
		document.body.appendChild(script);
	}

	return {
		getFacebookCount: function(url, callbackName) {
			injectScript('https://graph.facebook.com/?id=' + url + '&callback=' + callbackName);
		},
		getTwitterCount: function(url, callbackName) {
			injectScript('http://urls.api.twitter.com/1/urls/count.json?url=' + url + '&callback=' + callbackName);
		}
	};
})();

// Callbacks to do something with the result
function twitterCallback(result) {
	result.count && console.log('The count is: ', result.count);
}

function facebookCallback(result) {
	result.shares && console.log('The count is: ', result.shares);
}

// Usage
socialGetter.getFacebookCount('https://davidwalsh.name/twitter-facebook-jsonp', 'facebookCallback');
socialGetter.getTwitterCount('https://davidwalsh.name/twitter-facebook-jsonp', 'twitterCallback');