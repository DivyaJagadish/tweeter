/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "NewtonDfrgtrth",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}
const  createTweetElement  = function(tweetData){
  const $tweet = $(`<article class="tweet">
  <header>
    <div id ="nameandphoto">
    <img src=${tweetData.user.avatars}>
    <h3>${tweetData.user.name}</h3> 
  </div >
    <h4>${tweetData.user.handle}"</h4>
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
const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like

$(document).ready (function(){ 
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});