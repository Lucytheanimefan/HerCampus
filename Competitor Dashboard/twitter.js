import getTwitterFollowers from 'get-twitter-followers';

token = '1486245986-nwqzW414I9CvVyHfpAksoZW1gz95tAnv3zoCJNP'
getTwitterFollowers(token, 'dango_ramen').then(followers => {
	console.log(followers); // "User Objects" array https://dev.twitter.com/overview/api/users
});

theUrl = 'https://api.twitter.com/1.1/users/show.json'
var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", theUrl, screen_name = "dango_ramen"); // false for synchronous request
xmlHttp.send(null);
return xmlHttp.responseText;

