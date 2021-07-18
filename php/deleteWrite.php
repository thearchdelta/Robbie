<?php
include "dbConnect.php";
$conn = OpenCon();

$Return = "";

theFunction();

function theFunction() {
	global $Return,$filename;
	$conn = OpenCon();
// FIRST GET THE FILENAME:
	$query = "SELECT filename FROM writes WHERE id=".$_POST['id'];
	$result = mysqli_query( $conn,$query );
	while ( $rslt = mysqli_fetch_object( $result ) ){
		$filename = $rslt->filename;
	}
// DELETE THE FILE:
$file_pointer = "../upload/$filename";

// Use unlink() function to delete a file
if (!unlink($file_pointer)) {
    echo ("$file_pointer cannot be deleted due to an error");
}
else {
    echo ("$file_pointer has been deleted");
}

	$id = mysqli_real_escape_string($conn,stripSlashes($_POST['id']));
	$Query = "DELETE from writes WHERE id = " . $id;
	$Result = mysqli_query( $conn,$Query );
	echo $Query;
}
?>
