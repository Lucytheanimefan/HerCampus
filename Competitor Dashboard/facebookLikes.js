//her campus # facebook likes: https://graph.facebook.com/v2.3/113692773321?fields=likes&access_token=1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk
// id: 113692773321
//access token: 1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk

// Function gets total number of facebook likes
function getLikes(access_token, pageID,callback){
	var url='https://graph.facebook.com/v2.3/'+pageID+'?fields=likes&access_token='+access_token;
	$.getJSON(url, function(json){
		callback(json.likes);
	})
}

var access_token='1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk'
id='113692773321'

getLikes(access_token,id,function(d){
	document.getElementById("Facebook likes").innerHTML="Number of likes on Her Campus: "+d;
})