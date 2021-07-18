<?php

$to = "robbietucker@gmail.com";
// $to = $_POST['emailField'];
$subject = "Email from Website";
$nameField = $_POST['nameField'];
$emailField = $_POST['emailField'];
$messageField = $_POST['messageField'];

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <webmaster@robbietuckerwrites.com>' . "\r\n";

$message = "
	<div>
		$nameField, ($emailField) sent the following:
		<br/><br/>
		<div style='padding:30px;border:dashed gainsboro 4px;border-radius:8px;background:#faf5ef;font-size:16px'>
			$messageField
		</div>
	</div>
";

if(mail($to,$subject,$message,$headers)){
    echo "Mail sent!";
}
else{
	echo "Sorry, mail was not sent. Please try again later.";
}
?>
