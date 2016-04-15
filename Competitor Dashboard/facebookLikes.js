//her campus # facebook likes: https://graph.facebook.com/v2.3/113692773321?fields=likes&access_token=1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk
// id: 113692773321
//access token: 1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk
/**
data = [] //associative array with time and number of likes
	// Function gets total number of facebook likes
function getTotLikes(access_token, pageID, callback) {
	var url = 'https://graph.facebook.com/v2.3/' + pageID + '?fields=likes&access_token=' + access_token;
	$.getJSON(url, function(json) {
		callback(json.likes, pageIDs[json.id]);
	})
}

function getPostLikes(access_token, pageID, postNum, callback) {
	var url = 'https://graph.facebook.com/' + pageID + '/feed/?fields=message,link,created_time,type,name,id,likes.limit(1).summary(true),comments.limit(1).summary(true),shares&limit=' + postNum + '&access_token=' + access_token;
	$.getJSON(url, function(json) {
		//console.log(json.data.likes);
		callback(json.data[0].likes.summary.total_count);
	})
}

function getPost(access_token, pageID, postNum, callback) {
	var url = 'https://graph.facebook.com/' + pageID + '/feed/?fields=message,link,created_time,type,name,id,likes.limit(1).summary(true),comments.limit(1).summary(true),shares&limit=' + postNum + '&access_token=' + access_token;
	$.getJSON(url, function(json) {
		//console.log(json.data.likes);
		//the media source, name the title of the post, the message, and the number of likes
		callback(pageIDs[pageID], json.data[0].name, json.data[0].message, json.data[0].likes.summary.total_count);
	})
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var date = setInterval(
	function() {
		var today = new Date().toJSON().slice(0, 10);
		document.getElementById('Date').innerHTML = String(today);
	}, 3000);


var pageIDs = {
	'113692773321': 'Her Campus',
	'6636341311': 'Teen Vogue',
	'8028997215': 'Seventeen',
	'26815555478': 'Glamour',
	'86973707921': 'Refinery 29',
	'8358247707': 'Cosmopolitan',
	'10799255126': 'Marie Claire'
};

var pageIDs2 = {
	'Her Campus':'113692773321',
	'Teen Vogue':'6636341311',
	'Seventeen':'8028997215',
	'Glamour':'26815555478',
	'Refinery 29':'86973707921',
	'Cosmopolitan':'8358247707',
	'Marie Claire':'10799255126'
};

var access_token = '1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk'
id = '113692773321'

getPostLikes(access_token, id, 1, function(d) {
	console.log(d);
});

getPost(access_token, id, 1, function(d) {
	console.log(d);
})

console.log("HERE:"+pageIDs[1]);
//Her Campus data
var herCampusInterval=setInterval(function(){
	var div=document.getElementById("Her Campus");
	getTotLikes(access_token,pageIDs2["Her Campus"], function(likes, name){
		div.innerHTML = div.innerHTML + "<br>Facebook likes: "+numberWithCommas(likes);
	});
	getPost(access_token, pageIDs2["Her Campus"], 1, function(media, title, message, likes) {
			div.innerHTML = div.innerHTML + "<br>" + "Most recent post: " + title + ": " + message + "<br> Number of likes: "+likes+"<br><br>";
	});
	div.innerHTML="Her Campus"; //reset the div
},3000)

//Her Campus data
var TeenVogueInterval=setInterval(function(){
	var div=document.getElementById("Teen Vogue");
	getTotLikes(access_token,pageIDs2["Teen Vogue"], function(likes, name){
		div.innerHTML = div.innerHTML + "<br>Facebook likes: "+numberWithCommas(likes);
	});
	getPost(access_token, pageIDs2["Teen Vogue"], 1, function(media, title, message, likes) {
			div.innerHTML = div.innerHTML + "<br>" + "Most recent post: " + title + ": " + message + "<br> Number of likes: "+likes+"<br><br>";
	});
	div.innerHTML="Teen Vogue"; //reset the div
},3000)

//Seventeen data
var SeventeenInterval=setInterval(function(){
	var div=document.getElementById("Seventeen");
	getTotLikes(access_token,pageIDs2["Seventeen"], function(likes, name){
		div.innerHTML = div.innerHTML + "<br>Facebook likes: "+numberWithCommas(likes);
	});
	getPost(access_token, pageIDs2["Seventeen"], 1, function(media, title, message, likes) {
			div.innerHTML = div.innerHTML + "<br>" + "Most recent post: " + title + ": " + message + "<br> Number of likes: "+likes+"<br><br>";
	});
	div.innerHTML="Seventeen"; //reset the div
},3000)

//Glamour data
var GlamourInterval=setInterval(function(){
	var div=document.getElementById("Glamour");
	getTotLikes(access_token,pageIDs2["Glamour"], function(likes, name){
		div.innerHTML = div.innerHTML + "<br>Facebook likes: "+numberWithCommas(likes);
	});
	getPost(access_token, pageIDs2["Glamour"], 1, function(media, title, message, likes) {
			div.innerHTML = div.innerHTML + "<br>" + "Most recent post: " + title + ": " + message + "<br> Number of likes: "+likes+"<br><br>";
	});
	div.innerHTML="Glamour"; //reset the div
},3000)

//Refinery29 data
var Refinery29Interval=setInterval(function(){
	var div=document.getElementById("Refinery 29");
	getTotLikes(access_token,pageIDs2["Refinery 29"], function(likes, name){
		div.innerHTML = div.innerHTML + "<br>Facebook likes: "+numberWithCommas(likes);
	});
	getPost(access_token, pageIDs2["Refinery 29"], 1, function(media, title, message, likes) {
			div.innerHTML = div.innerHTML + "<br>" + "Most recent post: " + title + ": " + message + "<br> Number of likes: "+likes+"<br><br>";
	});
	div.innerHTML="Refinery 29"; //reset the div
},3000)

//Cosmopolitan data
var CosmopolitanInterval=setInterval(function(){
	var div=document.getElementById("Cosmopolitan");
	getTotLikes(access_token,pageIDs2["Cosmopolitan"], function(likes, name){
		div.innerHTML = div.innerHTML + "<br>Facebook likes: "+numberWithCommas(likes);
	});
	getPost(access_token, pageIDs2["Cosmopolitan"], 1, function(media, title, message, likes) {
			div.innerHTML = div.innerHTML + "<br>" + "Most recent post: " + title + ": " + message + "<br> Number of likes: "+likes+"<br><br>";
	});
	div.innerHTML="Cosmopolitan"; //reset the div
},3000)

//Cosmopolitan data
var MarieClaireInterval=setInterval(function(){
	var div=document.getElementById("Marie Claire");
	getTotLikes(access_token,pageIDs2["Marie Claire"], function(likes, name){
		div.innerHTML = div.innerHTML + "<br>Facebook likes: "+numberWithCommas(likes);
	});
	getPost(access_token, pageIDs2["Marie Claire"], 1, function(media, title, message, likes) {
			div.innerHTML = div.innerHTML + "<br>" + "Most recent post: " + title + ": " + message + "<br> Number of likes: "+likes+"<br>";
	});
	div.innerHTML="Marie Claire"; //reset the div
},3000)

/**
var interval = setInterval(function() {
	for (var key in pageIDs) {
		var div = document.getElementById("Facebook likes")
			//div.innerHTML=div.innerHTML+"<br> Number of likes on "+key+": ";
		getTotLikes(access_token, key, function(likes, name) {
			console.log(likes + " " + name)
			div.innerHTML = div.innerHTML + "<br>" + name + ": " + numberWithCommas(likes);
		});
	}
	div.innerHTML = "";
}, 10000);


var postInterval = setInterval(function() {
	for (var key in pageIDs) {
		var div = document.getElementById('Facebook posts');

		getPost(access_token, key, 1, function(media, title, message, likes) {
			div.innerHTML = div.innerHTML + "<br>" + media + ": " + title + ": " + message + "<br> Number of likes: "+likes+"<br>";
		});
	}
	div.innerHTML = "";
}, 10000);
**/
var access_token = 'CAAWdfwwO1foBAJfa8XWHnm3wbb9LRRWtFp9SL0ZBtmm2S1XpMUMEtHIvy8ZAxKmGwGi5hBSAbryXCAJ5jAsD2CiynmyqBwDmkCvzOiUK5cvv1ZC0sbM05Bf0MdcJujfdnM1idNRtZATrhBsWKCZCrwiqonPxWtiHLyv8vLI9UKmyB49kamxdBxyN5FEjjJz94ygZAwTH3W8L3Ij2LWOpSE';

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		testAPI();
	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		document.getElementById('status').innerHTML = 'Please log ' +
			'into this app.';
	} else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		document.getElementById('status').innerHTML = 'Please log ' +
			'into Facebook.';
	}
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

window.fbAsyncInit = function() {
	FB.init({
		appId: '1580543872259578',
		cookie: true, // enable cookies to allow the server to access 
		// the session
		xfbml: true, // parse social plugins on this page
		version: 'v2.5' // use graph api version 2.5
	});

	// Now that we've initialized the JavaScript SDK, we call 
	// FB.getLoginStatus().  This function gets the state of the
	// person visiting this page and can return one of three states to
	// the callback you provide.  They can be:
	//
	// 1. Logged into your app ('connected')
	// 2. Logged into Facebook, but not your app ('not_authorized')
	// 3. Not logged into Facebook and can't tell if they are logged into
	//    your app or not.
	//
	// These three cases are handled in the callback function.

	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});

};

// Load the SDK asynchronously
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s);
	js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
	console.log('Welcome!  Fetching your information.... ');
	FB.api('/me', function(response) {
		console.log('Successful login for: ' + response.name);
		document.getElementById('status').innerHTML =
			'Thanks for logging in, ' + response.name + '!';
	});
}


FB.login(function(response) {
	if (response.authResponse) {
		FB.api('/me', function(response) {
			console.log('Hello ' + response.name);
		});
	} else {
		//login cancelled or not every permission accepted
	}
}, {
	scope: 'manage_pages, read_stream'
}); //additional permissions