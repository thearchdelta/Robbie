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
	// $result = mysqli_query( $conn,"DELETE FROM `preview`" );

	/*````````````````````````````````````````````/
  /     If We're Editing, Set the Editing flag  /
/............................................*/
	if(isset($_GET['edit'])){
		$query = "UPDATE preview SET editing='1'";
		$result = mysqli_query( $conn,$query ) or die($conn->error);
	}
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
