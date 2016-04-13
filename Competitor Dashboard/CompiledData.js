//her campus # facebook likes: https://graph.facebook.com/v2.3/113692773321?fields=likes&fb_access_token=1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk
// id: 113692773321
//access token: 1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk

//All of the data from Facebook, Instagram and Twitter
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
	'Her Campus':'113692773321',
	'Teen Vogue':'6636341311',
	'Seventeen':'8028997215',
	'Glamour':'26815555478',
	'Refinery 29':'86973707921',
	'Cosmopolitan':'8358247707',
	'Marie Claire':'10799255126'
};

var fb_access_token = '1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk'


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

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var date = setInterval(
	function() {
		var today = new Date().toJSON().slice(0, 10);
		document.getElementById('Date').innerHTML = String(today);
	}, 3000);


//update table by row
//facebook total likes
var fbtotLikes=setInterval(function(){
	var data=[];
	for (var i=0; i<7; i++){
		data.push("cell"+i);
	}
},1000)

//Her Campus data
var herCampusInterval=setInterval(function(){
	var div=document.getElementById("Her Campus");
	getTotLikes(fb_access_token,fbpageIDs2["Her Campus"], function(likes, name){
		div.innerHTML = div.innerHTML + "<br>Facebook likes: "+numberWithCommas(likes);
	});
	getPost(fb_access_token, fbpageIDs2["Her Campus"], 1, function(media, title, message, likes) {
			div.innerHTML = div.innerHTML + "<br>" + "most recent fb post: " + title + ": " + message + "<br> Number of likes: "+likes+"<br><br>";
	});
	div.innerHTML="Her Campus"; //reset the div
},3000)

//Her Campus data
var TeenVogueInterval=setInterval(function(){
	var div=document.getElementById("Teen Vogue");
	getTotLikes(fb_access_token,fbpageIDs2["Teen Vogue"], function(likes, name){
		div.innerHTML = div.innerHTML + "<br>Facebook likes: "+numberWithCommas(likes);
	});
	getPost(fb_access_token, fbpageIDs2["Teen Vogue"], 1, function(media, title, message, likes) {
			div.innerHTML = div.innerHTML + "<br>" + "most recent fb post: " + title + ": " + message + "<br> Number of likes: "+likes+"<br><br>";
	});
	div.innerHTML="Teen Vogue"; //reset the div
},3000)

//Seventeen data
var SeventeenInterval=setInterval(function(){
	var div=document.getElementById("Seventeen");
	getTotLikes(fb_access_token,fbpageIDs2["Seventeen"], function(likes, name){
		div.innerHTML = div.innerHTML + "<br>Facebook likes: "+numberWithCommas(likes);
	});
	getPost(fb_access_token, fbpageIDs2["Seventeen"], 1, function(media, title, message, likes) {
			div.innerHTML = div.innerHTML + "<br>" + "most recent fb post: " + title + ": " + message + "<br> Number of likes: "+likes+"<br><br>";
	});
	div.innerHTML="Seventeen"; //reset the div
},3000)

//Glamour data
var GlamourInterval=setInterval(function(){
	var div=document.getElementById("Glamour");
	getTotLikes(fb_access_token,fbpageIDs2["Glamour"], function(likes, name){
		div.innerHTML = div.innerHTML + "<br>Facebook likes: "+numberWithCommas(likes);
	});
	getPost(fb_access_token, fbpageIDs2["Glamour"], 1, function(media, title, message, likes) {
			div.innerHTML = div.innerHTML + "<br>" + "most recent fb post: " + title + ": " + message + "<br> Number of likes: "+likes+"<br><br>";
	});
	div.innerHTML="Glamour"; //reset the div
},3000)

//Refinery29 data
var Refinery29Interval=setInterval(function(){
	var div=document.getElementById("Refinery 29");
	getTotLikes(fb_access_token,fbpageIDs2["Refinery 29"], function(likes, name){
		div.innerHTML = div.innerHTML + "<br>Facebook likes: "+numberWithCommas(likes);
	});
	getPost(fb_access_token, fbpageIDs2["Refinery 29"], 1, function(media, title, message, likes) {
			div.innerHTML = div.innerHTML + "<br>" + "most recent fb post: " + title + ": " + message + "<br> Number of likes: "+likes+"<br><br>";
	});
	div.innerHTML="Refinery 29"; //reset the div
},3000)

//Cosmopolitan data
var CosmopolitanInterval=setInterval(function(){
	var div=document.getElementById("Cosmopolitan");
	getTotLikes(fb_access_token,fbpageIDs2["Cosmopolitan"], function(likes, name){
		div.innerHTML = div.innerHTML + "<br>Facebook likes: "+numberWithCommas(likes);
	});
	getPost(fb_access_token, fbpageIDs2["Cosmopolitan"], 1, function(media, title, message, likes) {
			div.innerHTML = div.innerHTML + "<br>" + "most recent fb post: " + title + ": " + message + "<br> Number of likes: "+likes+"<br><br>";
	});
	div.innerHTML="Cosmopolitan"; //reset the div
},3000)

//Cosmopolitan data
var MarieClaireInterval=setInterval(function(){
	var div=document.getElementById("Marie Claire");
	getTotLikes(fb_access_token,fbpageIDs2["Marie Claire"], function(likes, name){
		div.innerHTML = div.innerHTML + "<br>Facebook likes: "+numberWithCommas(likes);
	});
	getPost(fb_access_token, fbpageIDs2["Marie Claire"], 1, function(media, title, message, likes) {
			div.innerHTML = div.innerHTML + "<br>" + "most recent fb post: " + title + ": " + message + "<br> Number of likes: "+likes+"<br>";
	});
	div.innerHTML="Marie Claire"; //reset the div
},3000)

