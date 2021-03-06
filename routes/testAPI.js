var express = require("express");
var router = express.Router();
var Twitter = require("twitter");
var config = require("../config");
var client = new Twitter(config);
var tweet_array = {};

function helper(params) {
  client.get(
    "https://api.twitter.com/1.1/statuses/user_timeline.json",
    params,
    function (error, tweets, response) {
      response.set("Access-Control-Allow-Origin", "*");
      console.log(error);
      if (!error) {
        tweet_array = tweets;
      }
    }
  );
}

router.post("/", function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  var username = req.body.username;
  var params = { screen_name: "narendramodi", count: 10 };
  helper(params);
  res.send(tweet_array);
});

module.exports = router;
