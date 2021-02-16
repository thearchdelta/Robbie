$(document).ready(function(){
  $(".round-page-num").click(function(){
      gsap.to(window, {duration: .95, scrollTo:$(this).data("dest"),ease:Power4.easeInOut});
  });
});
