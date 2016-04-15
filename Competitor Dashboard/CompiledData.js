//her campus # facebook likes: https://graph.facebook.com/v2.3/113692773321?fields=likes&fb_access_token=1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk
// id: 113692773321
//access token: 1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk

//All of the data from Facebook, Instagram and Twitter
var numColumns = 5;
var media = ['Her Campus', 'Teen Vogue', 'Seventeen', 'Glamour', 'Refinery 29',
	'Cosmopolitan', 'Marie Claire'
];

var fbpageIDs = {
	'113692773321': 'Her Campus',
	'6636341311': 'Teen Vogue',
	'8028997215': 'Seventeen',
	'26815555478': 'Glamour',
	'86973707921': 'Refinery 29',
	'8358247707': 'Cosmopolitan',
	'10799255126': 'Marie Claire'
};

var fbpageIDs2 = {
	'Her Campus': '113692773321',
	'Teen Vogue': '6636341311',
	'Seventeen': '8028997215',
	'Glamour': '26815555478',
	'Refinery 29': '86973707921',
	'Cosmopolitan': '8358247707',
	'Marie Claire': '10799255126'
};

var instIDs = {
	'Her Campus': '36456825',
	'Teen Vogue': '4073479',
	'Seventeen': '22492633',
	'Glamour': '10070230',
	'Refinery 29': '2983181',
	'Cosmopolitan': '42725516',
	'Marie Claire': '17372994'
};
var fb_access_token = '1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk'
var inst_access_token = '3039584474.1677ed0.fa83f841e7374682954ee8017e26ee21'

function getTotLikes(fb_access_token, pageID, callback) {
	var url = 'https://graph.facebook.com/v2.3/' + pageID + '?fields=likes&access_token=' + fb_access_token;
	$.getJSON(url, function(json) {
		callback(json.likes, fbpageIDs[json.id]);
	})
}

function getPostLikes(fb_access_token, pageID, postNum, callback) {
	var url = 'https://graph.facebook.com/' + pageID + '/feed/?fields=message,link,created_time,type,name,id,likes.limit(1).summary(true),comments.limit(1).summary(true),shares&limit=' + postNum + '&access_token=' + fb_access_token;
	$.getJSON(url, function(json) {
		//console.log(json.data.likes);
		callback(json.data[0].likes.summary.total_count);
	})
}

function getPost(fb_access_token, pageID, postNum, callback) {
	var url = 'https://graph.facebook.com/' + pageID + '/feed/?fields=message,link,created_time,type,name,id,likes.limit(1).summary(true),comments.limit(1).summary(true),shares&limit=' + postNum + '&access_token=' + fb_access_token;
	$.getJSON(url, function(json) {
		//console.log(json.data.likes);
		//the media source, name the title of the post, the message, and the number of likes
		callback(fbpageIDs[pageID], json.data[0].name, json.data[0].message, json.data[0].likes.summary.total_count);
	})
}

//returns number of Instagram followers
function getInsta(access_token, user_id, callback) {
	url = 'https://api.instagram.com/v1/users/' + user_id + '?access_token=' + access_token
	console.log(url);
	$.getJSON(url, function(json) {
		console.log(json);
		//callback(json);
		callback(json.data.counts.followed_by);
	})
}

//returns number of Instagram posts
function getInstaMedia(access_token, user_id, callback) {
	url = 'https://api.instagram.com/v1/users/' + user_id + '?access_token=' + access_token
	console.log(url);
	$.getJSON(url, function(json) {
		console.log(json);
		//callback(json);
		callback(json.data.counts.media);
	})
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
		/*getTwitterCount: function(url, callbackName) {
			injectScript('http://urls.api.twitter.com/1/urls/count.json?url=' + url + '&callback=' + callbackName);
		}*/
	};
})();

// Callbacks to do something with the result
/*function twitterCallback(result) {
	result.count && console.log('The count is: ', result.count);
}*/

function facebookCallback(result) {
	result.shares && console.log('The count is: ', result.shares);
	var output=document.getElementById("output");
	output.innerHTML="Number of fb shares: "+numberWithCommas(result.shares);
}
//Clicking button to get number of shares
document.getElementById("SubmitButton").onclick=function(){
	var text=document.getElementById('Text').value;
	console.log(text);
	socialGetter.getFacebookCount(text, 'facebookCallback');
}

//setting to today's date
var date = setInterval(
	function() {
		var today = new Date().toJSON().slice(0, 10);
		document.getElementById('Date').innerHTML = String(today);
	}, 3000);


//create table cells
//map & filter later!
var data = []; // holds all of the cells
for (var row = 0; row < 7; row++) {
	var table = document.getElementById("myTable");
	var myRow = table.insertRow(table.rows.length);
	var promise = new Promise(function(resolve, reject) {
		for (var i = 0; i < numColumns; i++) {
			data["Cell" + row + i] = myRow.insertCell(i);
			console.log("Cell" + row + i);
		}
		//media titles
		data["Cell" + row + 0].innerHTML = media[row];
		console.log("Length: " + Object.keys(data).length);
		//if all cells are created, resolve

		resolve({
			data: data,
			row: row
		});

	});
	promise.then(function(stuff) {
		var interval = setInterval(function() {


			//facebook page likes
			getTotLikes(fb_access_token, fbpageIDs2[media[stuff.row]], function(likes) {
				console.log("HERE:" + likes);
				stuff.data["Cell" + stuff.row + 1].innerHTML = numberWithCommas(likes);
			});

			//most recent facebook post likes
			getPost(fb_access_token, fbpageIDs2[media[stuff.row]], 1, function(media, title, message, likes) {
				stuff.data["Cell" + stuff.row + 2].innerHTML = likes;
			});

			//Instagram followers
			getInsta(inst_access_token, instIDs[media[stuff.row]], function(followers) {
				console.log("Followers: " + followers);
				stuff.data["Cell" + stuff.row + 3].innerHTML = numberWithCommas(followers);
			})

			//Instagram Post count
			getInstaMedia(inst_access_token, instIDs[media[stuff.row]], function(media) {
				console.log("Media: " + media);
				stuff.data["Cell" + stuff.row + 4].innerHTML = numberWithCommas(media);
			})


		}, 1000);
	});
}
/***
	for (var i = 0; i < numColumns; i++) {
		data["Cell"+row+i] = myRow.insertCell(i);
		console.log("Cell"+row+i);
	}
	//media titles
	data["Cell"+row+0].innerHTML = media[row];

	//facebook data
	getTotLikes(fb_access_token, fbpageIDs2[media[row]], function(likes, name) {
		console.log("HERE:" + likes);
		data["Cell" + row + 1].innerHTML = numberWithCommas(likes);
	});
	
}

//update table by row
//facebook total likes
/**
var fbtotLikes = setInterval(function() {
	var data = [];
	for (var i = 0; i < 7; i++) {
		data.push("cell" + i);

	}
}, 1000)
**/
/*
//Her Campus data row 1
var herCampusInterval = setInterval(function() {
	var div = document.getElementById("Her Campus");
	getTotLikes(fb_access_token, fbpageIDs2["Her Campus"], function(likes, name) {
		div.innerHTML = div.innerHTML + "<br>Facebook likes: " + numberWithCommas(likes);
	});
	getPost(fb_access_token, fbpageIDs2["Her Campus"], 1, function(media, title, message, likes) {
		div.innerHTML = div.innerHTML + "<br>" + "most recent fb post: " + title + ": " + message + "<br> Number of likes: " + likes + "<br><br>";
	});
	div.innerHTML = "Her Campus"; //reset the div
}, 3000)

//Her Campus data
var TeenVogueInterval = setInterval(function() {
	var div = document.getElementById("Teen Vogue");
	getTotLikes(fb_access_token, fbpageIDs2["Teen Vogue"], function(likes, name) {
		div.innerHTML = div.innerHTML + "<br>Facebook likes: " + numberWithCommas(likes);
	});
	getPost(fb_access_token, fbpageIDs2["Teen Vogue"], 1, function(media, title, message, likes) {
		div.innerHTML = div.innerHTML + "<br>" + "most recent fb post: " + title + ": " + message + "<br> Number of likes: " + likes + "<br><br>";
	});
	div.innerHTML = "Teen Vogue"; //reset the div
}, 3000)

//Seventeen data
var SeventeenInterval = setInterval(function() {
	var div = document.getElementById("Seventeen");
	getTotLikes(fb_access_token, fbpageIDs2["Seventeen"], function(likes, name) {
		div.innerHTML = div.innerHTML + "<br>Facebook likes: " + numberWithCommas(likes);
	});
	getPost(fb_access_token, fbpageIDs2["Seventeen"], 1, function(media, title, message, likes) {
		div.innerHTML = div.innerHTML + "<br>" + "most recent fb post: " + title + ": " + message + "<br> Number of likes: " + likes + "<br><br>";
	});
	div.innerHTML = "Seventeen"; //reset the div
}, 3000)

//Glamour data
var GlamourInterval = setInterval(function() {
	var div = document.getElementById("Glamour");
	getTotLikes(fb_access_token, fbpageIDs2["Glamour"], function(likes, name) {
		div.innerHTML = div.innerHTML + "<br>Facebook likes: " + numberWithCommas(likes);
	});
	getPost(fb_access_token, fbpageIDs2["Glamour"], 1, function(media, title, message, likes) {
		div.innerHTML = div.innerHTML + "<br>" + "most recent fb post: " + title + ": " + message + "<br> Number of likes: " + likes + "<br><br>";
	});
	div.innerHTML = "Glamour"; //reset the div
}, 3000)

//Refinery29 data
var Refinery29Interval = setInterval(function() {
	var div = document.getElementById("Refinery 29");
	getTotLikes(fb_access_token, fbpageIDs2["Refinery 29"], function(likes, name) {
		div.innerHTML = div.innerHTML + "<br>Facebook likes: " + numberWithCommas(likes);
	});
	getPost(fb_access_token, fbpageIDs2["Refinery 29"], 1, function(media, title, message, likes) {
		div.innerHTML = div.innerHTML + "<br>" + "most recent fb post: " + title + ": " + message + "<br> Number of likes: " + likes + "<br><br>";
	});
	div.innerHTML = "Refinery 29"; //reset the div
}, 3000)

//Cosmopolitan data
var CosmopolitanInterval = setInterval(function() {
	var div = document.getElementById("Cosmopolitan");
	getTotLikes(fb_access_token, fbpageIDs2["Cosmopolitan"], function(likes, name) {
		div.innerHTML = div.innerHTML + "<br>Facebook likes: " + numberWithCommas(likes);
	});
	getPost(fb_access_token, fbpageIDs2["Cosmopolitan"], 1, function(media, title, message, likes) {
		div.innerHTML = div.innerHTML + "<br>" + "most recent fb post: " + title + ": " + message + "<br> Number of likes: " + likes + "<br><br>";
	});
	div.innerHTML = "Cosmopolitan"; //reset the div
}, 3000)

//Cosmopolitan data
var MarieClaireInterval = setInterval(function() {
	var div = document.getElementById("Marie Claire");
	getTotLikes(fb_access_token, fbpageIDs2["Marie Claire"], function(likes, name) {
		div.innerHTML = div.innerHTML + "<br>Facebook likes: " + numberWithCommas(likes);
	});
	getPost(fb_access_token, fbpageIDs2["Marie Claire"], 1, function(media, title, message, likes) {
		div.innerHTML = div.innerHTML + "<br>" + "most recent fb post: " + title + ": " + message + "<br> Number of likes: " + likes + "<br>";
	});
	div.innerHTML = "Marie Claire"; //reset the div
}, 3000)*/