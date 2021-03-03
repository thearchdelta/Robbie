$(document).ready(function(){

    let picArray = gsap.utils.toArray(".image");
    let picArrayRev = gsap.utils.toArray(".image").reverse();
    let textArray = gsap.utils.toArray(".image-text");
    let currPic = picArray.length-1;
    var theGSAPInstance;

    function fadeIn(picIndex){
        /*---begin textflow---*/
        gsap.to($(".bigBackText,.middleBackText,.smallBackText"),1,{opacity:0,onComplete:function(){
            $(".bigBackText,.middleBackText,.smallBackText").html( $(picArray[picIndex]).find(".the-actual-text").html() );
            gsap.to($(".bigBackText,.middleBackText,.smallBackText"),2,{opacity:1});
        }});
        /*---end textflow---*/

        if($(picArray[picIndex]).find(".image-text").length !== 0){ //if it's a text div
            gsap.set($(picArray[picIndex]).find(".image-text"),{scale:1.2});

            gsap.to($(picArray[picIndex]).find(".image-text"),2,{scale:1});
            gsap.to($(picArray[picIndex]).find(".image-text"),6.5,{opacity:1});

            // here
            let nextIndex = picIndex === 0 ? picArray.length-1 : picIndex - 1 ;
            gsap.set($(picArray[nextIndex]).find(".img-hldr"),{opacity:0,backgroundSize:"120% 120%",backgroundPosition:"center center"});

            gsap.to($(picArray[nextIndex]).find(".img-hldr"),1.95,{opacity:1,delay:7});
            gsap.to($(picArray[nextIndex]).find(".img-hldr"),3,{ backgroundSize:"100% 100%",delay:6.5 });
            //end here

            gsap.to($(picArray[picIndex]).find(".image-text"),1.95,{opacity:0,scale:0.8,delay:6.5,onComplete:function(){
                currPic = picIndex === 0 ? picArray.length-1 : picIndex - 1 ;
                fadeIn(currPic);
            }});
        }
        else{ //if it's an image div
            // gsap.set($(picArray[picIndex]).find(".img-hldr"),{opacity:0,backgroundSize:"120% 120%",backgroundPosition:"center center"});
            //
            // gsap.to($(picArray[picIndex]).find(".img-hldr"),.95,{opacity:1});
            // gsap.to($(picArray[picIndex]).find(".img-hldr"),3,{ backgroundSize:"100% 100%" });
            gsap.to($(picArray[picIndex]).find(".img-hldr"),.95,{backgroundSize:"95% 95%",opacity:0,delay:5,onComplete:function(){
                currPic = picIndex === 0 ? picArray.length-1 : picIndex - 1 ;
                fadeIn(currPic);
            }});
        }

    }

    /*-------------------SUPPORT FUNCTIONS-----------------*/
        function showBlurb(blurbIndex){

            gsap.set($(picArray[blurbIndex]).find(".image-text"),{scale:1.2});
            gsap.to($(picArray[blurbIndex]).find(".image-text"),2,{scale:1,delay:2});
            gsap.to($(picArray[blurbIndex]).find(".image-text"),6.5,{opacity:1,ease:Back.easeOut,delay:2});
            gsap.to(picArray[blurbIndex],.95,{opacity:0,delay:12.5,onComplete:function(){
                gsap.set($(picArray[blurbIndex]).find(".image-text"),{opacity:0});
                currPic = blurbIndex === 0 ? picArray.length-1 : blurbIndex - 1 ;
                fadeIn(currPic);
            }});
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
