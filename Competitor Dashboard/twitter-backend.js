  var Twitter = require('twitter-node-client').Twitter;
  var http = require('http');

  //Get this data from your twitter apps dashboard
  var config = {
      "consumerKey": "uwAcM2cGOqcuslNIFHgYoyJRL",
      "consumerSecret": "aV03HYizmS1vmMJ5dZROeVVcXQWGMiq48CsTgFGCZK1xiahRBx",
      "accessToken": "1486245986-nwqzW414I9CvVyHfpAksoZW1gz95tAnv3zoCJNP",
      "accessTokenSecret": "JlBa1Fewyhk6S4sLw9I4D5GEOTI849gL8TShPQVeUlV5l",
      //"callBackUrl": "XXX"
  }

  var twitter = new Twitter(config);

  //Example calls
 var error = function (err, response, body) {
        console.log('ERROR [%s]', err);
    };
    var success = function (data) {
        console.log('Data [%s]', data);
    };
  twitter.getUserTimeline({
      screen_name: 'BoyCook',
      count: '10'
  }, error, success);

  twitter.getMentionsTimeline({
      count: '10'
  }, error, success);

  twitter.getHomeTimeline({
      count: '10'
  }, error, success);

  twitter.getReTweetsOfMe({
      count: '10'
  }, error, success);

  twitter.getTweet({
      id: '1111111111'
  }, error, success);

  http.createServer(function(req, res) {
      res.end();
  }).listen(8080);