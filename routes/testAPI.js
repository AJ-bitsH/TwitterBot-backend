var express = require("express");
var router = express.Router();
var Twitter = require("twitter");
var config = require("../config");
var client = new Twitter(config);
var tweet_array = {};
var username = "";

var params = { screen_name: username, count: 10 };
client.get(
  "https://api.twitter.com/1.1/statuses/user_timeline.json",
  params,
  function (error, tweets, response) {
    console.log(error);
    if (!error) {
      tweet_array = tweets;
    }
  }
);

router.get("/", function (req, res, next) {
  username = req.body;
  res.send(tweet_array);
});

module.exports = router;
