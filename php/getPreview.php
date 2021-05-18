<?php
include "dbConnect.php";
$conn = OpenCon();

$ReturnTitle = "";
$ReturnContent = "";

theFunction();

function theFunction() {
	global $ReturnTitle;
	global $ReturnContent;
	$conn = OpenCon();

	$query = "SELECT * FROM preview LIMIT 1";
	$result = mysqli_query( $conn,$query );
	// echo $query;
	while ( $preview = mysqli_fetch_object( $result ) )
	{
		$ReturnTitle = $preview->title;
		$ReturnContent = $preview->content ;
	}
	$result = mysqli_query( $conn,"DELETE FROM `preview`" );
}

$myObj = new \stdClass();
$myObj->title = $ReturnTitle;
$myObj->content = $ReturnContent;

$myJSON = json_encode($myObj);
echo $myJSON;
// echo "<br/><br/>";
// echo $ReturnTitle;
// echo "<br/><br/>";
// echo $ReturnContent;
?>
