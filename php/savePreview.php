<?php
include "dbConnect.php";
$conn = OpenCon();

$Return = "";

theFunction();

function theFunction() {
	global $Return;
	$conn = OpenCon();

	$previewTitle = mysqli_real_escape_string($conn,stripSlashes($_POST['previewTitle']));
	$previewContent = mysqli_real_escape_string($conn,stripSlashes($_POST['previewContent']));

	$Query = "INSERT INTO `preview`(`title`, `content`) VALUES ('$previewTitle','$previewContent')";
	echo $Query;
	$Result = mysqli_query( $conn,$Query ) or die("Query failed: %s\n". $conn -> error);
	$last_id = mysqli_insert_id($conn);
}
echo $Return;
?>
