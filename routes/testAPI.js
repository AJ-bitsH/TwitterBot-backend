var express = require("express");
var router = express.Router();
var Twitter = require("twitter");
var config = require("../config");
var client = new Twitter(config);
var tweet_array = {};
var cors = require("cors");

function helper(params) {
  client.get(
    "https://api.twitter.com/1.1/statuses/user_timeline.json",
    params,
    cors(),
    function (error, tweets, response) {
      console.log(error);
      if (!error) {
        tweet_array = tweets;
      }
    }
  );
}

router.post("/", cors(), function (req, res, next) {
  var username = req.body.username;
  var params = { screen_name: "narendramodi", count: 10 };
  helper(params);
  res.send(tweet_array);
});

module.exports = router;
