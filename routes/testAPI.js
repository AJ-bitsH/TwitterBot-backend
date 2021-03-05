var express = require("express");
var router = express.Router();
var Twitter = require("twitter");
var config = require("../config");
var client = new Twitter(config);
var tweet_array = {};

var params = { user_id: "1367067637847494658", count: 10 };
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
  res.send(tweet_array);
});

module.exports = router;
