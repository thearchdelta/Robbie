$(document).ready(function(){

    let picArray = gsap.utils.toArray(".image");
    let textArray = gsap.utils.toArray(".image-text");
    let currPic = picArray.length-1;
    var theGSAPInstance;

    function fadeIn(picIndex){
        highlightThumb();
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
            picArray.forEach((thumb,i)=>{
                thumbID = picArray.length-1-i;
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
        }
    /*--------------------END SUPPORT FUNCTIONS-----------------*/


    appendThumb();
    fadeIn(currPic);

    /*------CLICKING A THUMBNAIL------*/
    $(".round").click(function(){
        theGSAPInstance.kill();
        fadeIn2( parseInt($(this).data('index')) );
    });
    /*------CLICKING THE IMAGE------*/
    $(".image,#slideControl").click(function(){
        theGSAPInstance.kill();
        fadeIn2( picArray.length - 1- currPic );
    });
    /*------CLICKING READ TESTS------*/
    $(".read-tests").click(function(){
        readTests();
    });
    /*------CLICKING VIEW COVER------*/
    $(".view-cover").click(function(){
        viewCover();
    });
});
