//her campus # facebook likes: https://graph.facebook.com/v2.3/113692773321?fields=likes&access_token=1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk
// id: 113692773321
//access token: 1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk

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

var access_token = '1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk'
id = '113692773321'

getPostLikes(access_token, id, 1, function(d) {
	console.log(d);
});

getPost(access_token, id, 1, function(d) {
	console.log(d);
})

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