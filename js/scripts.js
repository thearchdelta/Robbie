$(document).ready(function(){

    let picArray = gsap.utils.toArray(".main-frame");
    let currPic = picArray.length-1;

    function fadeIn(picIndex){
    //if it's a text div
        if($(picArray[picIndex]).find(".image-text").length !== 0){
            gsap.set($(picArray[picIndex]).find(".image-text"),{scale:1.2});
            gsap.set($(picArray[picIndex]),{opacity:1});

            gsap.to($(picArray[picIndex]).find(".image-text"),2,{scale:1});
            gsap.to($(picArray[picIndex]).find(".image-text"),2.5,{opacity:1});

            // here
            let nextIndex = picIndex === 0 ? picArray.length-1 : picIndex - 1 ;
            gsap.set($(picArray[nextIndex]),{opacity:0,backgroundSize:"120% 120%",backgroundPosition:"center center"});

            gsap.to($(picArray[nextIndex]),2,{opacity:1,ease:Power4.easeIn,delay:0});
            gsap.to($(picArray[nextIndex]),3.5,{ backgroundSize:"100% 100%",delay:0.5 });
            //end here

            gsap.to($(picArray[picIndex]).find(".image-text"),1,{opacity:0,scale:1,delay:1.5,onComplete:function(){
                currPic = picIndex === 0 ? picArray.length-1 : picIndex - 1 ;
                fadeIn(currPic);
            }});
        }
    //if it's an image div
        else{
            gsap.to($(picArray[picIndex]),.95,{opacity:0,backgroundSize:"95% 95%",delay:0,onComplete:function(){
                currPic = picIndex === 0 ? picArray.length-1 : picIndex - 1 ;
                fadeIn(currPic);
            }});
        }

    }

    /*-------------------SUPPORT FUNCTIONS-----------------*/
    var nuhite = parseInt($("main").css('height')) - 50;
    nuhite = nuhite + "px";
    $("#scroll-hldr").css('height',nuhite);

    $(document).bind('mousewheel', function(e){
       // alert("wheel");
   });
    $(document).keyup(function(e){
       // alert("wheel");
   });

   $("#scroll-hldr").scroll(function(){
     gsap.set($(".left-side"),{y:$("#scroll-hldr").scrollTop()});
   });
    /*--------------------END SUPPORT FUNCTIONS-----------------*/

    /*````````````````````````````````````/
  /     call main function fadeIn()     /
/....................................*/
    let url = $(location).attr('href');
    // if( url.indexOf("index.html") > -1 ) fadeIn(currPic);

    if( url.indexOf("writings.html") > -1 ){
        let snippetArray = gsap.utils.toArray(".snippet");
        snippetArray.forEach((snippet)=>{
            if($(snippet).html().length > 400){
                $(snippet).html( $(snippet).html().substring(0, 400) + "... <a href='" + $(snippet).data("id") + ".html' style='color:orange;font-size:10pt'><b>READ THE REST OF THIS ENTRY.</b></a>");
            }
        })
    }
});
