//her campus # facebook likes: https://graph.facebook.com/v2.3/113692773321?fields=likes&access_token=1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk
// id: 113692773321
//access token: 1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk

// Function gets total number of facebook likes
function getLikes(access_token, pageID,callback){
	var url='https://graph.facebook.com/v2.3/'+pageID+'?fields=likes&access_token='+access_token;
	$.getJSON(url, function(json){
		callback(json.likes, pageIDs[json.id]);
	})
}

var pageIDs={'113692773321':'Her Campus','6636341311':'Teen Vogue', '8028997215':'Seventeen',
'26815555478':'Glamour',  '86973707921':'Refinery 29',  '8358247707':'Cosmopolitan', '10799255126':'Marie Claire'};

var access_token='1725954970975324|sidVOHslF41oAH_KWdlnhNRuDWk'
id='113692773321'

for (var key in pageIDs){
	var div=document.getElementById("Facebook likes")
	//div.innerHTML=div.innerHTML+"<br> Number of likes on "+key+": ";
	getLikes(access_token,key,function(likes, name){
		console.log(likes+" "+name)
		div.innerHTML=div.innerHTML+"<br>"+name+": "+likes;
	});
}
