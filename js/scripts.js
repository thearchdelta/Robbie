$(document).ready(function(){

    let picArray = gsap.utils.toArray(".image");
    let textArray = gsap.utils.toArray(".image-text");
    let currPic = picArray.length-1;
    var theGSAPInstance;

    function fadeIn(picIndex){
        highlightThumb();
        theGSAPInstance = gsap.set($(picArray[picIndex]),{rotationY:"30deg",scale:.7});
        theGSAPInstance = gsap.set($(picArray[picIndex]).children(".img-hldr"),{backgroundSize:"100% 100%",backgroundPosition:"center center"});
        theGSAPInstance = gsap.set($(picArray[picIndex]).children(".image-text"),{opacity:0});

        theGSAPInstance = gsap.to(picArray[picIndex],.95,{opacity:1});
        theGSAPInstance = gsap.to($(picArray[picIndex]),3,{rotationY:"0deg",scale:1});
        theGSAPInstance = gsap.to($(picArray[picIndex]).children(".img-hldr"),3,{backgroundSize:"100% 100%",onComplete:function(){
            showBlurb(picIndex);
        }});
    }

    /*-------------------SUPPORT FUNCTIONS-----------------*/
        function showBlurb(blurbIndex){
            theGSAPInstance = gsap.to($(picArray[blurbIndex]).children(".img-hldr").children(".image-text"),1.5,{opacity:1,delay:2});
            theGSAPInstance = gsap.to(picArray[blurbIndex],.95,{opacity:0,delay:6.5,onComplete:function(){
                currPic = blurbIndex === 0 ? picArray.length-1 : blurbIndex - 1 ;
                fadeIn(currPic);
            }});
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
                }else{
                    gsap.to(img,1,{opacity:0});
                }
            });
            textArray.forEach((txtBlok,j)=>{
                gsap.to(txtBlok,.3,{opacity:0});
            });
            $(".read-tests").delay(300).fadeIn();
        }

        function readTests(){
            $(".read-tests").delay(300).fadeOut();
            $(".view-cover").delay(300).fadeIn();
            textArray.forEach((txtBlok,i)=>{
                if(currPic === i){
                    gsap.to(txtBlok,1,{opacity:1});
                }else{
                    gsap.to(txtBlok,1,{opacity:0});
                }
            });
        }
        function viewCover(){
            $(".read-tests").delay(300).fadeIn();
            $(".view-cover").delay(300).fadeOut();
            $(".image-text").fadeOut();
        }
    /*--------------------END SUPPORT FUNCTIONS-----------------*/


    appendThumb();
    fadeIn(currPic);

    /*------CLICKING A THUMBNAIL------*/
    $(".round").click(function(){
        theGSAPInstance.kill();
        fadeIn2( parseInt($(this).data('index')) );
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
