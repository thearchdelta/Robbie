$(document).ready(function(){

    let picArray = gsap.utils.toArray(".main-frame");
    let currPic = picArray.length-1;

    function fadeIn(picIndex){
        /*---begin textflow---*/
        gsap.to($(".bigBackText,.middleBackText,.smallBackText"),1,{opacity:0,onComplete:function(){
            $(".bigBackText,.middleBackText,.smallBackText").html( $(picArray[picIndex]).find(".the-actual-text").html() );
            gsap.to($(".bigBackText,.middleBackText,.smallBackText"),2,{opacity:1});
        }});
        /*---end textflow---*/

    //if it's a text div
        if($(picArray[picIndex]).find(".image-text").length !== 0){
            gsap.set($(picArray[picIndex]).find(".image-text"),{scale:1.2});
            gsap.set($(picArray[picIndex]),{opacity:1});

            gsap.to($(picArray[picIndex]).find(".image-text"),2,{scale:1});
            gsap.to($(picArray[picIndex]).find(".image-text"),6.5,{opacity:1});

            // here
            let nextIndex = picIndex === 0 ? picArray.length-1 : picIndex - 1 ;
            gsap.set($(picArray[nextIndex]),{opacity:0,backgroundSize:"120% 120%",backgroundPosition:"center center"});

            gsap.to($(picArray[nextIndex]),5,{opacity:1,ease:Power4.easeIn,delay:5.5});
            gsap.to($(picArray[nextIndex]),5,{ backgroundSize:"100% 100%",ease:Power4.easeInOut,delay:6.5 });
            //end here

            gsap.to($(picArray[picIndex]).find(".image-text"),2,{opacity:0,scale:.8,delay:7.5,onComplete:function(){
                currPic = picIndex === 0 ? picArray.length-1 : picIndex - 1 ;
                fadeIn(currPic);
            }});
        }
    //if it's an image div
        else{
            gsap.to($(picArray[picIndex]),.95,{backgroundSize:"95% 95%",opacity:0,delay:5,onComplete:function(){
                currPic = picIndex === 0 ? picArray.length-1 : picIndex - 1 ;
                fadeIn(currPic);
            }});
        }

    }

    /*-------------------SUPPORT FUNCTIONS-----------------*/

    /*--------------------END SUPPORT FUNCTIONS-----------------*/

    /*````````````````````````````````````/
  /     call main function fadeIn()     /
/....................................*/
    fadeIn(currPic);

    $(".catshield").fadeOut(5000);

    /*---------START TEXTFLOW--------*/
    gsap.to($(".bigBackText"),2100,{x:-10000});
    gsap.to($(".middleBackText"),2100,{x:-20000});
    gsap.to($(".smallBackText"),2100,{x:-40000});
});
