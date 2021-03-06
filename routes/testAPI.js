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
      console.log(error);
      if (!error) {
        tweet_array = tweets;
      }
    }
  );
}

router.post("/", function (req, res, next) {
  var username = req.body.username;
  var params = { screen_name: username, count: 100 };
  helper(params);
  var result = [];
  tweet_array.map((tweet, index) => {
    if (tweet.entities.urls.length > 0) {
      result.push({ text: tweet.text, urls: tweet.entities.urls });
    }
  });

  res.send(result);
});

module.exports = router;
