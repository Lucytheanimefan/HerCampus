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
    appId      : '1580543872259578',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
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
    js = d.createElement(s); js.id = id;
    js.src = "all.js";
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

var insights_access_token = 'CAAWdfwwO1foBAI949NAhZCXEMwFmUJOZAOZCdez4RpmZCZAKKrbJW9xkQex8TKLuo38QIOGUdFs5APWFX9lMZBNZBVZAZCrZAmGYl2vDQS7yPNWbZC8PqUXLMJYuEg2ffzHZAf6yzYEfYmwJ87UqLVzqaurkZC0H5zlZB8IrQU1GhosRZCGnQ1409DbVTq44HX5If7Wn8eBTZC9a85lo2gZDZD'

function getPageImpressions(insights_access_token, callback) {
	var url = 'https://graph.facebook.com/v2.6/HerCampusMagazine/insights/page_impressions?access_token=' + insights_access_token;
	$.getJSON(url, function(json) {
		//returns: page impressions from the last day, from the last week, and the last 28 days
		callback(json.data[0].values[0].value, json.data[1].values[0].value, json.data[2].values[0].value);
	})
}

//returns number of engaged users
function getEngagedUsers(insights_access_token, callback) {
	var url = 'https://graph.facebook.com/v2.6/HerCampusMagazine/insights/page_engaged_users?access_token=' + insights_access_token;
	$.getJSON(url, function(json) {
		callback(json.data[0].values[0].value, json.data[1].values[0].value, json.data[2].values[0].value);
	})
}

//returns total number of people who liked your page
function getPageFans(insights_access_token, callback) {
	var url = 'https://graph.facebook.com/v2.6/HerCampusMagazine/insights/page_fans?access_token=' + insights_access_token;
	$.getJSON(url, function(json) {
		callback(json.data[0].values[2].value);
	})
}

//getPageImpressions(insights_access_token, function(d, g, h) {
//	console.log(d + " " + g + " " + h);
//});

stats = ['Total # of Page Likes', 'Page Engaged Users (# of people egaged with page)', 'Page impressions', '# of people who clicked on content', 'Daily total post likes'];
//create table cells
//map & filter later!
var numColumns = 2;
var data = []; // holds all of the cells
var promise = new Promise(function(resolve, reject) {
	for (var row = 0; row < 5; row++) {
		var table = document.getElementById("FacebookInsights");
		var myRow = table.insertRow(table.rows.length);
		//var promise = new Promise(function(resolve, reject) {
		for (var i = 0; i < numColumns; i++) {
			data["Cell" + row + i] = myRow.insertCell(i);

			console.log("Cell" + row + i);
		}
		//stat titles
		data["Cell" + row + 0].innerHTML = stats[row];

	}
	//if all cells are created, resolve
	console.log(data);
	resolve(data);
});

promise.then(function(stuff) {
	//var interval = setInterval(function() {

	//facebook page likes
	getPageFans(insights_access_token, function(likes) {
		//console.log("HERE:" + likes);
		stuff["Cell01"].innerHTML = numberWithCommas(likes);
	});

	//number of engaged users
	getEngagedUsers(insights_access_token, function(users) {
		stuff["Cell" + 11].innerHTML = users;
	});

	//Page impressions
	getPageImpressions(insights_access_token, function(impressions) {
		stuff["Cell" + 21].innerHTML = numberWithCommas(impressions);
	})



	//}, 1000);
});