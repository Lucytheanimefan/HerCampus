//instagram
access_token = '3039584474.1677ed0.fa83f841e7374682954ee8017e26ee21'
ID='36456825'

//returns number of followers
function getInsta(access_token, user_id, callback) {
	url = 'https://api.instagram.com/v1/users/' + user_id + '?access_token=' + access_token
	console.log(url);
	$.getJSON(url, function(json) {
		callback(json.data.counts.followed_by);
	})
}

getInsta(access_token, '36456825',function(follows){
	console.log("In the function!");
	console.log("Instagram follows: "+follows);
});

console.log("Hi");

/**
$(function() {
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			cache: true,
            url: "https://api.instagram.com/v1/users/"+ID+"/?access_token="+access_token,
			success: function(data) {
				var ig_count = data.counts.followed_by.toString();
				ig_count = add_commas(ig_count);
				$(".instagram_count").html(ig_count);
			}
		});
		function add_commas(number) {
			if (number.length > 3) {
				var mod = number.length % 3;
				var output = (mod > 0 ? (number.substring(0,mod)) : '');
				for (i=0 ; i < Math.floor(number.length / 3); i++) {
					if ((mod == 0) && (i == 0)) {
						output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
					} else {
						output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
					}
				}
				return (output);
			} else {
				return number;
			}
		}
	});
	**/