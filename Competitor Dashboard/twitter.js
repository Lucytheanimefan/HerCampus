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

//instagram
access_token = '3039584474.4364f2b.086a1a1ce4564d218067ef62f5d69553'

//returns number of followers
function getInsta(access_token, user_id, callback) {
	url = 'https://api.instagram.com/v1/users/' + user_id + '/?access_token=' + access_token
	$.getJSON(url, function(json) {
		callback(json.data[0].counts.followed_by);
	})
}

getInsta(access_token, 'hercampus',function(follows){
	console.log(follows);
});