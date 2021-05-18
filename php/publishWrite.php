<?php
include "dbConnect.php";
$conn = OpenCon();

$Return = "";

theFunction();

function theFunction() {
	global $Return;
	$conn = OpenCon();

	$query = "SELECT title FROM writes ORDER BY sequence";
	$result = mysqli_query( $conn,$query );

	while ( $title = mysqli_fetch_object( $result ) )
	{
		$Return .= "<div class='writetitle'> $title->title </div>"  ;
	}
}
echo $Return;
?>
