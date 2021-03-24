$(document).ready ( function(){
 $("article").hover(function(){
  //  mouse enters
  $(this).find("h4").show();
  $(this).css({"opacity":"1","box-shadow": "5px 6px blue"})
 
 },function(){
   //mouse leaves
  $(this).find("h4").hide();
  $(this).css({"opacity":"0.2","box-shadow":"none"});
 });
  
});