<?php
include "dbConnect.php";
$conn = OpenCon();

$ReturnTitle = "";
$ReturnContent = "";
$editing = 0;
$editID = 0;
$last_id = "";

theFunction();

function theFunction() {
	global $ReturnTitle;
	global $ReturnContent;
	global $editing;
	global $editID;
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
		$editing = mysqli_real_escape_string($conn,stripSlashes( $preview->editing));
		$editID = mysqli_real_escape_string($conn,stripSlashes( $preview->editID));
	}
	echo "EDITING is $editing.";
	if($editing == 0){
		$query = "INSERT INTO writes(title, content) VALUES ('" . $ReturnTitle . "','" . $ReturnContent . "')";
	}
	else{
		$query = "UPDATE writes SET title='" . $ReturnTitle . "',`content`='" . $ReturnContent ."' WHERE id=".$editID;
		//And, crucially, reset editing to zero:
		$result = mysqli_query( $conn,"UPDATE preview SET editing='0'" ) or die($conn->error);
	}
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
