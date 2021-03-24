/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}
// create new tweets;
const createTweetElement = function (tweetData) {
  const $tweet = $(`<article class="tweet">
   <header>
      <div id ="nameandphoto">
        <img src=${tweetData.user.avatars}>
        <h3>${tweetData.user.name}</h3> 
    </div >
      <h4>${tweetData.user.handle}</h4>
  </header>
  <div class="boxed"> ${tweetData.content.text}</div>
  <footer>
    <p>${tweetData.created_at}</p>
    <p>
    <i class='fas fa-flag'></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </p> 
  </footer>
</article>`);
return $tweet;
};

$(document).ready(function () {
// renders old tweets
  renderTweets(data);

  $("#tweetform").on("submit",function(event){
    event.preventDefault() ;
    //  data from the form is serialised;
    const $data = $(this).serialize();
    $.ajax({
      url : "/tweets",
      method : "POST",
      data: $data
    }).then(function(result){
      console.log("Sucess",result);
    });

  })

});