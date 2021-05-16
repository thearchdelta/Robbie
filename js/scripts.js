$(document).ready(function(){

    let picArray = gsap.utils.toArray(".main-frame");
    let currPic = picArray.length-1;

    function fadeInOld(picIndex){
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

    function fadeIn(picIndex){
    //if it's a text div
        if($(picArray[picIndex]).find(".image-text").length !== 0){
            gsap.set($(picArray[picIndex]).find(".image-text"),{scale:1.2});
            gsap.set($(picArray[picIndex]),{opacity:1});

            gsap.to($(picArray[picIndex]).find(".image-text"),2,{scale:1});
            gsap.to($(picArray[picIndex]).find(".image-text"),2.5,{opacity:1});

            // here
            let nextIndex = picIndex === 0 ? picArray.length-1 : picIndex - 1 ;
            gsap.set($(picArray[nextIndex]),{opacity:0,backgroundSize:"auto 120%",backgroundPosition:"center center"});

            gsap.to($(picArray[nextIndex]),2,{opacity:1,ease:Power4.easeIn,delay:0});
            gsap.to($(picArray[nextIndex]),3.5,{ backgroundSize:"auto 100%",delay:0.5 });
            //end here

            gsap.to($(picArray[picIndex]).find(".image-text"),1,{opacity:0,scale:1,delay:1.5,onComplete:function(){
                currPic = picIndex === 0 ? picArray.length-1 : picIndex - 1 ;
                fadeIn(currPic);
            }});
        }
    //if it's an image div
        else{
            gsap.to($(picArray[picIndex]),.95,{opacity:0,backgroundSize:"auto 95%",delay:0,onComplete:function(){
                currPic = picIndex === 0 ? picArray.length-1 : picIndex - 1 ;
                fadeIn(currPic);
            }});
        }

    }

    /*-------------------SUPPORT FUNCTIONS-----------------*/


   $(document).scroll(function(){
     gsap.set(".left-side-bm",{y:$(document).scrollTop()});
     gsap.set(".right-side-edits",{y:$(document).scrollTop()/2.5});
   });
    /*--------------------END SUPPORT FUNCTIONS-----------------*/

    /*`````````````````````````````````````/
  /     DETERMINE THIS PAGE'S URL        /
/.....................................*/
    let url = $(location).attr('href');


    /*-------------------MENU CONTROL-----------------*/

    //Add actv class to appropriate menu item
    $(".main-menu a").each(function(){
        if( url.indexOf( $(this).attr('href') ) > -1 ){
            $(this).addClass("actv");
        }
      });

    $(".burgerMenu").click(()=>{
        $(".theModal").fadeIn();
        gsap.to(".theModalMenu",.25,{x:0});
    });
    $(".theModal").click(()=>{
        gsap.to(".theModalMenu",.5,{x:"-100%"});
        $(".theModal").hide();
    });

    $(".burgerMenu2").click(()=>{
        $(".theModal2").fadeIn();
        gsap.to(".theModalMenu",.25,{x:0});
    });
    $(".theModal2").click(()=>{
        gsap.to(".theModalMenu",.5,{x:"-100%"});
        $(".theModal2").hide();
    });
    /*--------------------END MENU CONTROL-----------------*/

    /*````````````````````````````````````/
  /     call main function fadeIn()     /
/....................................*/
    if( url.indexOf("index.html") > -1 ) fadeIn(currPic);

    /*````````````````````````````````````````````/
  /     Snippet size control on Writes page     /
/............................................*/
    if( url.indexOf("writes.html") > -1 ){
        let snippetArray = gsap.utils.toArray(".snippet");
        snippetArray.forEach((snippet)=>{
            if($(snippet).html().length > 400){
                $(snippet).html( $(snippet).html().substring(0, 400) + "... <a href='" + $(snippet).data("id") + ".html' style='font-size:11pt'><b>READ THE REST OF THIS ENTRY.</b></a>");
            }
        })
    }
});
