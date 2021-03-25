/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 
//escape from Xss
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};
// create new tweets;
const createTweetElement = function (tweetData) {
  const $tweet = $(`<article class="tweet">
   <header>
      <div id ="nameandphoto">
        <img src=${escape(tweetData.user.avatars)}>
        <h3>${escape(tweetData.user.name)}</h3> 
    </div >
      <h4>${escape(tweetData.user.handle)}</h4>
  </header>
  <div class="boxed"> ${escape(tweetData.content.text)}</div>
  <footer>
    <p>10 days ago</p>
    <p>
    <i class='fas fa-flag'></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </p> 
  </footer>
</article>`);
return $tweet;
};

// renderTweets(data);
const loadtweets =function(){
  $.ajax({
    url : "/tweets",
    method : "GET",
  }).then(function(result){
    renderTweets(result);
  });
};
loadtweets();
$(document).ready(function () {

  $("#tweetform").on("submit",function(event){
    event.preventDefault() ;
    //  data from the form is serialised;
    $("#error").hide();
    const $data = $(this).serialize();
    const data =decodeURIComponent($data).substr(5);//converts to data with no URL component and substr as it contains text=
    if(data.length !== 0 && $data.length <=140) {
      $.ajax({
        url : "/tweets",
        method : "POST",
        data: $data
      }).then(function(result){  
      });
      $( '#tweetform' ).each(function(){
        this.reset();
        $(this).find(".counter").html(140)
    });
   } else if(data.length >140) {
    $("#error").show();
     $("#error").css({"opacity":"1"}).html(`<p id="errormsg">Error:Too long...Length exceeds 140 characters!!!!</p>`)
   } else {
    $("#error").show();
    $("#error").css({"opacity":"1"}).html(`<p id="errormsg">No message.Type your tweet bedore submission!!!!</p>`)
   }
  })
});