<?php
include "dbConnect.php";
$conn = OpenCon();

$Return = "";

theFunction();

function theFunction() {
	global $Return;
	$conn = OpenCon();

	$id = mysqli_real_escape_string($conn,stripSlashes($_POST['id']));
	$Query = "DELETE from writes WHERE id = " . $id;
	$Result = mysqli_query( $conn,$Query );
	echo $Query;
}
?>
