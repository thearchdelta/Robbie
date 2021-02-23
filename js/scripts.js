$(document).ready(function(){
    let picArray = gsap.utils.toArray(".image");
    let currPic = picArray.length-1;

    const fadeIn = ()=>{
        highlightThumb();
        gsap.set(picArray[currPic],{scale:1.2});
        gsap.set($(picArray[currPic]).children("div"),{opacity:0});

        gsap.to(picArray[currPic],.95,{opacity:1});
        gsap.to(picArray[currPic],3,{scale:1,onComplete:function(){
            gsap.to($(picArray[currPic]).children("div"),5,{opacity:1,delay:2});
            gsap.to(picArray[currPic],.95,{opacity:0,delay:10,onComplete:function(){
                currPic = currPic === 0 ? picArray.length-1 : currPic - 1 ;
                fadeIn();
            }});
        }});
    }

    function appendThumb(){
        var thumbID;
        picArray.forEach((thumb,i)=>{
            thumbID = picArray.length-1-i;
            $(".magazine").append("<div class='round' id='thumb_"+thumbID+"' style='background-image:"+$(thumb).css("background-image")+"'></div>");
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


    appendThumb();
    fadeIn();
});
