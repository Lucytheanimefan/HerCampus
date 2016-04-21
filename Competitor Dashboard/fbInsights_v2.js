//create table
stats = ['Total # of Page Likes', 'Page Engaged Users (# of people engaged with page)', 'Page impressions', 'Page Consumptions', 'Number of new people who liked page'];
//create table cells
//map & filter later!
var numColumns = 2;
var data = [];
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

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  FB.api(
    "/HerCampusMagazine/insights/page_fans", //total number of facebook likes
    function(likes) {
      if (likes && !likes.error) {
        data["Cell01"].innerHTML = numberWithCommas(likes.data[0].values[0].value);
      }
    });
  FB.api(
    "/HerCampusMagazine/insights/page_impressions",
    function(impressions) {
      if (impressions && !impressions.error) {
        data["Cell11"].innerHTML = numberWithCommas(impressions.data[0].values[0].value);
      }
    });
  FB.api(
    "/HerCampusMagazine/insights/page_engaged_users",
    function(engagements) {
      if (engagements && !engagements.error) {
        data["Cell21"].innerHTML = numberWithCommas(engagements.data[0].values[0].value);
      }
    });
  FB.api(
    "/HerCampusMagazine/insights/page_consumptions", //The number of times people clicked on any of your content
    function(totpageClicks) { 
      if (totpageClicks && !totpageClicks.error) {
        console.log(totpageClicks);
        data["Cell31"].innerHTML = numberWithCommas(totpageClicks.data[0].values[0].value);
      }
    });
  FB.api(
    "/HerCampusMagazine/insights/page_fan_adds", //The number of times people clicked on any of your content
    function(newLikes) { 
      if (newLikes && !newLikes.error) {
        console.log(newLikes);
        data["Cell41"].innerHTML = numberWithCommas(newLikes.data[0].values[0].value);
      }
    });
}
