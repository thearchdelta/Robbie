<?php
include "dbConnect.php";
$conn = OpenCon();


/*   UPLOAD THE FILE v3   */
if ( isset( $_FILES['docFile'] ) ) {

	// if ($_FILES['docFile']['type'] == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
	if (1 == 1) {

		$source_file = $_FILES['docFile']['tmp_name'];
		$dest_file = "../upload/".$_FILES['docFile']['name'];

        $title = mysqli_real_escape_string($conn,stripSlashes($_POST['title']));
        $snippet = mysqli_real_escape_string($conn,stripSlashes($_POST['snippet']));
        $filename = $_FILES['docFile']['name'];

		if (file_exists($dest_file)) {

			print "The file name already exists!!";
		}
		else {

    		move_uploaded_file( $source_file, $dest_file )
    		or die ("Error!!");

    		if($_FILES['docFile']['error'] == 0) {
        		echo "File $filename was successfully uploaded!! <br/><br/>";
        		echo "<b><u>Details : </u></b><br/>";
        		echo "Doc Title : $title <br/><br/>";
        		echo "File Name : ".$_FILES['docFile']['name']."<br.>"."<br/>";
        		echo "File Size : ".$_FILES['docFile']['size']." bytes"."<br/>";
        		echo "File location : upload/".$_FILES['docFile']['name']."<br/>";
    		}

            // /*  NOW WE INSERT INTO THE DATABASE  */
            $Query = "INSERT INTO writes (filename,title,snippet) VALUES ( '" .mysqli_real_escape_string($conn,stripSlashes($filename)). "', '" .$title. "', '" .$snippet. "')";
            $Result = mysqli_query( $conn,$Query ) or die("Query failed: %s\n". $conn -> error);
		}
	}
	else {

    	if ( $_FILES['docFile']['type'] != "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    		echo "Error occured while uploading file : ".$_FILES['docFile']['name']."<br/>";
    		echo "Invalid  file extension, should be docx !!"."<br/>";
    		echo "Error Code : ".$_FILES['docFile']['error']."<br/>";
		}
	}
}
/*   END UPLOAD THE FILE v3   */

/*  NOW WE PROCESS THE "CAPTION"     */


// $last_id = mysqli_insert_id($conn);

// $myObj = new \stdClass();
// $myObj->id = $last_id;
// $myObj->html = $returnHTML;
//
// $myJSON = json_encode($myObj);
// echo $myJSON;
?>
