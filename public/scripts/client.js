/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};
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
  const loadtweets =function(){
    $.ajax({
      url : "/tweets",
      method : "GET",
    }).then(function(result){
      renderTweets(result);
    });
  };
  loadtweets();
// renderTweets(data);
  $("#tweetform").on("submit",function(event){
    event.preventDefault() ;
    //  data from the form is serialised;
    const $data = $(this).serialize();
    const data =decodeURIComponent($data).substr(5);//converts to data with no URL component and substr as it contains text=
    if(data.length !== 0 && $data.length <=140) {
      $.ajax({
        url : "/tweets",
        method : "POST",
        data: $data
      }).then(function(result){
        loadtweets(result);
      });
   } else if(data.length >140) {
     alert("Error ! Tweet exceeds 140 Characters!");
   } else {
     alert("Error ! Tweet is empty");
   }
  })
});