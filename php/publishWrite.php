<?php
include "dbConnect.php";
$conn = OpenCon();

$ReturnTitle = "";
$ReturnContent = "";
$last_id = "";

theFunction();

function theFunction() {
	global $ReturnTitle;
	global $ReturnContent;
	global $last_id;
	$conn = OpenCon();

//+---> BEGIN QUERY
	$query = "SELECT * FROM preview LIMIT 1";
	$result = mysqli_query( $conn,$query );
//+---> END QUERY
	// echo $query;

	while ( $preview = mysqli_fetch_object( $result ) )
	{
		$ReturnTitle = mysqli_real_escape_string($conn,stripSlashes( $preview->title));
		$ReturnContent = mysqli_real_escape_string($conn,stripSlashes( $preview->content));
	}
	$query = "INSERT INTO writes(title, content) VALUES ('" . $ReturnTitle . "','" . $ReturnContent . "')";
	// echo "<div style='font-family:Oxanium;font-size:30pt;background:#004764;color:white;padding:50px'> $query </div>";
	$result = mysqli_query( $conn,$query );
	$last_id = mysqli_insert_id($conn);
}

$myObj = new \stdClass();
$myObj->title = $ReturnTitle;
$myObj->content = $ReturnContent;
$myObj->id = $last_id;

$myJSON = json_encode($myObj);
echo $myJSON;
// echo $ReturnContent;
?>
