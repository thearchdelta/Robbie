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

			print "The file <span style='color:#ffa500'><i>'$filename'</i></span> name already exists!!";
		}
		else {

    		move_uploaded_file( $source_file, $dest_file )
    		or die ("Error!!");

    		if($_FILES['docFile']['error'] == 0) {
        		echo "File <span style='color:#ffa500'><i>'$filename'</i></span> has been successfully uploaded!! <br/><br/>";
        		echo "<b><u>Details : </u></b><br/>";
        		echo "<span style='color:#ffa500'>Doc Title</span> : $title <br/><br/>";
        		echo "<span style='color:#ffa500'>File Name</span> : ".$_FILES['docFile']['name']."<br.>"."<br/>";
        		echo "<span style='color:#ffa500'>File Size</span> : ".$_FILES['docFile']['size']." bytes"."<br/>";
        		echo "<span style='color:#ffa500'>File location</span> : upload/".$_FILES['docFile']['name']."<br/>";
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
