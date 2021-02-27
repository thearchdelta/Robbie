$(document).ready(function(){

    let picArray = gsap.utils.toArray(".image");
    let picArrayRev = gsap.utils.toArray(".image").reverse();
    let textArray = gsap.utils.toArray(".image-text");
    let currPic = picArray.length-1;
    var theGSAPInstance;

    function fadeIn(picIndex){
        highlightThumb();
        $(".bigBackText,.middleBackText,.smallBackText").fadeOut(1000);
        $(".bigBackText,.middleBackText,.smallBackText").html( $(picArray[picIndex]).find(".the-actual-text").html() );
        $(".bigBackText,.middleBackText,.smallBackText").fadeIn();
        theGSAPInstance = gsap.set($(picArray[picIndex]).children(".img-hldr"),{backgroundSize:"120% 120%",backgroundPosition:"center center"});

        theGSAPInstance = gsap.to(picArray[picIndex],.95,{opacity:1});
        theGSAPInstance = gsap.to($(picArray[picIndex]).children(".img-hldr"),3,{backgroundSize:"100% 100%",onComplete:function(){
            showBlurb(picIndex);
        }});
    }

    /*-------------------SUPPORT FUNCTIONS-----------------*/
        function showBlurb(blurbIndex){
            theGSAPInstance = gsap.set($(picArray[blurbIndex]).find(".tl")  ,{width:5});
            theGSAPInstance = gsap.set($(picArray[blurbIndex]).find(".tr"), {height:5});
            theGSAPInstance = gsap.set($(picArray[blurbIndex]).find(".br"), {width:5});
            theGSAPInstance = gsap.set($(picArray[blurbIndex]).find(".bl")  ,  {height:5});

            theGSAPInstance = gsap.to($(picArray[blurbIndex]).find(".tl"),5.5  ,{width:"100%",delay:2});
            theGSAPInstance = gsap.to($(picArray[blurbIndex]).find(".tr"),5.5, {height:"100%",delay:2});
            theGSAPInstance = gsap.to($(picArray[blurbIndex]).find(".br"),5.5, {width:"100%",delay:2});
            theGSAPInstance = gsap.to($(picArray[blurbIndex]).find(".bl"),5.5  ,  {height:"100%",delay:2});

            theGSAPInstance = gsap.set($(picArray[blurbIndex]).find(".image-text"),{scale:1.2});
            theGSAPInstance = gsap.to($(picArray[blurbIndex]).find(".image-text"),2,{scale:1,delay:2});
            theGSAPInstance = gsap.to($(picArray[blurbIndex]).find(".image-text"),6.5,{opacity:1,ease:Back.easeOut,delay:2});
            theGSAPInstance = gsap.to(picArray[blurbIndex],.95,{opacity:0,delay:12.5,onComplete:function(){
                theGSAPInstance = gsap.set($(picArray[blurbIndex]).find(".image-text"),{opacity:0});
                currPic = blurbIndex === 0 ? picArray.length-1 : blurbIndex - 1 ;
                fadeIn(currPic);
            }});
        }
        function showBlurb2(blurbIndex){
            gsap.set($(picArray[blurbIndex]).find(".tl")  ,{width:5});
            gsap.set($(picArray[blurbIndex]).find(".tr"), {height:5});
            gsap.set($(picArray[blurbIndex]).find(".br"), {width:5});
            gsap.set($(picArray[blurbIndex]).find(".bl")  ,  {height:5});

            gsap.to($(picArray[blurbIndex]).find(".tl"),2.5  ,{width:"100%"});
            gsap.to($(picArray[blurbIndex]).find(".tr"),2.5, {height:"100%"});
            gsap.to($(picArray[blurbIndex]).find(".br"),2.5, {width:"100%"});
            gsap.to($(picArray[blurbIndex]).find(".bl"),2.5  ,  {height:"100%"});

            gsap.set($(picArray[blurbIndex]).find(".image-text"),{scale:1.2});
            gsap.to($(picArray[blurbIndex]).find(".image-text"),1.5,{scale:1,rotationY:"0deg",opacity:1});
        }
        function appendThumb(){
            var thumbID;
            picArrayRev.forEach((thumb,i)=>{
                thumbID = i;
                $(".magazine").append("<div class='round' id='thumb_"+thumbID+"' data-index='"+thumbID+"' style='background-image:"+$(thumb).children(".img-hldr").css("background-image")+"'></div>");
            });
        }
        function highlightThumb(){
            picArray.forEach((thumb,i)=>{
                if( i === picArray.length-1-currPic ){
                    $("#thumb_"+i).addClass("actv");
                }else{
                    $("#thumb_"+i).removeClass("actv");
                }
            });
        }

        function fadeIn2(ind){
            let indx = picArray.length-1-ind;
            currPic = indx;
            picArray.forEach((img,i)=>{
                if(indx === i){
                    gsap.to(img,1,{opacity:1});
                    showBlurb2(indx);
                }else{
                    gsap.to(img,1,{opacity:0});
                }
            });
            //now highlight the thumb
            thumbArray.forEach((thumb,j)=>{
                if( j === ind ){
                    $("#thumb_"+j).addClass("actv");
                }else{
                    $("#thumb_"+j).removeClass("actv");
                }
            });
        }
    /*--------------------END SUPPORT FUNCTIONS-----------------*/

  /*``````````````````````````/
 /     call append thumb    /
/........................*/
    appendThumb();
    let thumbArray = gsap.utils.toArray(".round");
    /*````````````````````````````````````/
  /     call main function fadeIn()     /
/....................................*/
    fadeIn(currPic);
    $(".catshield").fadeOut(5000);
    // gsap.to($(".main-title-frame-about,.inner-cartridge-about"),5,{width:"105%"});

    /*---------START TEXTFLOW--------*/
    gsap.to($(".bigBackText"),2100,{x:-10000});
    gsap.to($(".middleBackText"),2100,{x:-20000});
    gsap.to($(".smallBackText"),2100,{x:-40000});


    /*------CLICKING A THUMBNAIL------*/
    $(".round").click(function(){
        theGSAPInstance.kill();
        fadeIn2( parseInt($(this).data('index')) );
    });
    /*------CLICKING THE IMAGE OR THE PAUSE BUTTON------*/
    $(".image,#slideControl").click(function(){
        theGSAPInstance.kill();
        fadeIn2( picArray.length - 1- currPic );
        /*slideControlHldr
<div id="slideControl">PAUSE SLIDESHOW</div>*/
    });
});
