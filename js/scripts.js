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
     if( url.indexOf("writes.html") > -1 ) gsap.set(".left-side-bm",{y:$(document).scrollTop()});
     if( url.indexOf("edits.html") > -1 ) gsap.set(".right-side-edits",{y:$(document).scrollTop()/2.5});
     if( url.indexOf("writes.html") > -1 ) gsap.set(".right-side",{y:$(document).scrollTop()/2.5});
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

        /*``````````````````````````````````````````````````````````/
      /     Get Article Titles from database for Writes page      /
    /..........................................................*/
    if(window.location.pathname.indexOf("writes") > 0){
		$.ajax({
			type: "GET",
			url:  "php/getWritesTitles.php?writes=true",
			success: function(data) {
                data = JSON.parse(data);
				$(".left-side-bm,.theModal2>.theModalMenu").prepend(data.titles);
				$(".scroll-contentt").html(data.content);
			}
		});
	}

        /*``````````````````````````````````````````````````````````/
      /     Get Title and Content from database for Story page      /
    /..........................................................*/
    if(window.location.pathname.indexOf("story") > 0){
		$.ajax({
			type: "GET",
			url:  "php/getPreview.php",
			success: function(data) {
                data = JSON.parse(data);
				$(".preview-title").html(data.title);
				$(".preview-content").html(data.content);
			}
		});

        //GET SIDE MENU CONTENT
    		$.ajax({
    			type: "GET",
    			url:  "php/getWritesTitles.php?writes=true",
    			success: function(data) {
                    data = JSON.parse(data);
    				$(".left-side-bm,.theModal2>.theModalMenu").prepend(data.titles);
    			//	$(".scroll-contentt").html(data.content);
    			}
    		});
	}

        /*````````````````````````````````````````````````````````/
      /     Get Article Titles from database for dashboard      /
    /........................................................*/
    if(window.location.pathname.indexOf("dashboard") > 0){
		$.ajax({
			type: "GET",
			url:  "php/getWritesTitles.php",
			success: function(data) {
				$(".sortable").append(data);
			}
		});
	}

        /*````````````````````````````````````/
      /     Load preview from database      /
    /....................................*/
    if(window.location.pathname.indexOf("writePreview") > -1){
		$.ajax({
			type: "GET",
			url:  "php/getPreview.php",
			success: function(data) {
                data = JSON.parse(data);
                $(".preview-title").html(data.title);
                $(".preview-content").html(data.content);
    		}
		});
	}

	//clicking 'DELETE'
	$(".sortable").on("click", ".deleteSpan", function(){
		var id = $(this).data("id");
		var thisDerezzer = $("#derezzer_"+id);
		TweenMax.set(thisDerezzer, {rotationY:-55, rotationX:-55, opacity:0, x:-50, z:-50,display:"block", transformPerspective:650});
		TweenMax.to(thisDerezzer, .7,    {rotationY:0, rotationX:0, opacity:1, x:-140, z:0, ease:Back.easeOut});
	});

	$(".sortable").on("click", ".derezzer-no", function(){
		var id = $(this).data("id");
		var thisDerezzer = $("#derezzer_"+id);
		TweenMax.to(thisDerezzer, .25,   {rotationY:55, rotationX:55, opacity:0, x:150, z:-50, ease:Back.easeIn, onComplete: function(){
				thisDerezzer.hide();
				TweenMax.set(thisDerezzer,{rotationY:-55, rotationX:-55, opacity:0, x:-50, z:-50, transformPerspective:650});
			}
		});
	});

	$(".sortable").on("click", ".derezzer-yes", function(){
		var id = $(this).data("id");
		$(this).css("cursor", "wait");
		$delBtn = $(this);
		  $.ajax({
			type: "POST",
			url:  "php/deleteWrite.php",
			data: {id:id},
			success: function(data) {
				$delBtn.css("cursor", "pointer");
				TweenMax.to($("#paintingRecord_"+id),0.21,{scale:0.4,opacity:.3});
				TweenMax.to($("#paintingRecord_"+id),0.21,{y:-100, opacity:0,delay:0.4 });
				TweenMax.to($("#paintingRecord_"+id),.5,{padding:0,margin:0,height:0,ease:Power4.easeInOut,delay:0.4,onComplete:function(){ $("#paintingRecord_"+id).hide() } });
			}
		  });
	});

	//some hover effects #00bfff
	$(".sortable").on("mouseenter", "#no",
		function(){
			$(this).css({
				"background-color":"#00bfff",
				"color":"black",
				"box-shadow": "-1px 0px 26px 11px rgba(0,128,255,0.8)"});
		});
	$(".sortable").on("mouseleave", "#no",
		function(){
			$(this).css({"color":"#00bfff","background-color":"black","box-shadow": "none"});
		});

	$(".sortable").on("mouseenter", "#yes",
		function(){
			$(this).css({
				"background-color":"#ff4000",
				"color":"black",
				"box-shadow": "-1px 0px 26px 11px rgba(255,0,0,0.8)"});
		});
	$(".sortable").on("mouseleave", "#yes",
		function(){
			$(this).css({"color":"#ff4000","background-color":"black","box-shadow": "none"});
		});


});
/*----------------------------------------------------------------------------
                             BARRIER:  END document.ready() FUNCTION
-----------------------------------------------------------------------------*/

/*-----------------SAVE TITLE ORDER----------------*/
function saveTitleOrder(){
	// showUploading();
	// hideSaveTabs()
	let dataArray = [];
	let i = 1;
	$(".paintingRecord").each(function(){
		if($(this).is(':visible')){
			dataArray.push({id:$(this).attr("data-id"),index:i++});
		}
	});

	var payload = { myarray: dataArray };
	var payloadJSON = JSON.stringify(payload);

	$.post(
	   'php/updateTitleOrder.php',
	    { data: payloadJSON },
	    function(data) {
			//hideUploading();
	        // var result = JSON.parse(data);
			// console.log(data);
	    });
}

    /*``````````````````````````````````/
  /     Send preview to database      /
/..................................*/
function previewWrite(quill){
    var previewTitle = $("#previewTitle").val();
    var previewContent = quill.getContents();
    var quillHtml = quill.root.innerHTML.trim();
    var quillHtml = quillHtml.replace("#","No.");
    $.ajax({
        type: "GET",
        url:  "php/savePreview.php",
        data: {previewTitle:previewTitle,previewContent:quillHtml},
        success: function(data) {
            console.log(data);
            window.open('writePreview.html', '_top');
        }
    });
}


function paste(quill){
    console.log(quill.getText());
    quill.setContents([
        { insert: 'Hello Mporomongo ' },
        { insert: 'World!', attributes: { bold: true } },
        { insert: '\n' }
    ]);
}

    /*``````````````````````````````````/
  /     Publish preview to database   /
/..................................*/
function publishWrite(){
    let surgeArray = gsap.utils.toArray(".upsurge");
    gsap.to(surgeArray, 2, {y:-345,stagger:.2,ease:Power4.easeOut});

    $.ajax({
	  url: "php/publishWrite.php",
	  type: "GET",
	  success: function(data){
            data = JSON.parse(data);
            $("#viewPgBtn").on("click",function(){
                openWrite(data.id);
            });
            console.log(data.content);
      }
    });
}

    /*``````````````````````````````````/
  /     Open Story page              /
/..................................*/
function openWrite(id){
    $.ajax({
        type: "GET",
        url:  "php/getWritesTitles.php",
        data: {id:id},
        success: function(data) {
            window.open('story.html', '_top');
        }
    });
}
