var insights_access_token = 'CAAWdfwwO1foBAFEIHZA817pPLScXw2lRfPthO40vBAFwZBeBSHfhLm8IRNyBl3JYTrMSQDBSCSgV22DdLqkPav30rWZBzLD1ZAhB6zv0uKP2B96NBxE4vixmZCcvBFKfboCFJHbRdwSQGt9ZCZCyNrYi5zVsgviHfnX9189cNeevzj7TqQWPVMwWeJuWZBEIT0YFKoHuJoyigwZDZD'

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

getPageImpressions(insights_access_token, function(d, g, h) {
	console.log(d + " " + g + " " + h);
});

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
	resolve(data);
});

promise.then(function(stuff) {
	//var interval = setInterval(function() {

	//facebook page likes
	getPageFans(insights_access_token, function(likes) {
		//console.log("HERE:" + likes);
		stuff["Cell" + 01].innerHTML = numberWithCommas(likes);
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