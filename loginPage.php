<!doctype html>

<html lang="en">
    <head>
        <meta charset="utf-8">

        <title>Robbie's Dashboard</title>
        <meta name="description" content="Preview of mock-ups for Robbie">
        <meta name="Themba Nyathi" content="SitePoint">

        <link rel="stylesheet" href="css/styles.css?v=1.0">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css">
		<!-- BEGIN DRAGGABLE STYLE -->
	    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
		<!-- END DRAGGABLE STYLE -->
        <style>
            .sticky {
              position: -webkit-sticky;
              position: sticky;
              top:0;
              z-index: 1000;
            }
        </style>
    </head>

    <body class="bodylogin">



        			<div style="width:100vw;height:100vh;display:grid;place-items:center">
        				<div class="loginHldr">
        					<form id="loginForm" action="editImagesGUI.php" method="POST">
        						<!-- <div id="loginErrorMsg"><i class="bi bi-exclamation-triangle"></i> Wrong username/password &nbsp;<i class="bi bi-exclamation-triangle"></i> </div> -->
        						<p><label>USERNAME</label>&nbsp;<input type="text" name="username"/> </p>
        						<p><label>PASSWORD</label>&nbsp;<input type="text" name="password" style='width:385px'/> </p>
        						<p><input type="button" value="SUBMIT" style='width:100%' onclick="login()"/> </p>
        					</form>
        				</div>
        			</div>




        <!-- BEGIN SCRIPTS  -->
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.0/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.0/ScrollToPlugin.min.js" integrity="sha512-9DDJWj17gkdeGHU0Zr76wc9jY2g0IwE7ZCIxakVYKyzlTiOWZDZJOTaVgAzNo+LB7+EbGXxwCXkOP+a5rgkuqQ==" crossorigin="anonymous"></script>
	    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

        <script src="js/scripts.js"></script>

		<script>
    		TweenMax.set($("#loginForm"),{rotationY:-55, rotationX:55, opacity:0, x:-50, z:-50});
    		TweenMax.to($("#loginForm"),2.25,{rotationY:0, rotationX:0, opacity:1, x:0, z:0, ease:Back.easeOut,delay:1});

            function login(){
    		  $.ajax({
    			type: "POST",
    			url:  "php/login.php",
    			success: function(data) {
    			}
    		  });
            }
		</script>
        <!-- <script src="smooth-scrollbar-master/dist/smooth-scrollbar.js"></script>
        <script>
            Scrollbar.initAll({alwaysShowTracks: true});
        </script> -->
        <!-- END SCRIPTS  -->
    </body>
