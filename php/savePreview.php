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
	// $previewContent = $_POST['previewContent'];

	// $Query = "UPDATE `preview` SET (`title`, `content`) VALUES ('$previewTitle','$previewContent')";
	$Query = "UPDATE preview SET title='" . $previewTitle . "',`content`='" . $previewContent ."' WHERE id=0";
	echo $Query;
	$Result = mysqli_query( $conn,$Query ) or die("Query failed: %s\n". $conn -> error);
	$last_id = mysqli_insert_id($conn);
}
echo $Return;
?>
