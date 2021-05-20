<?php
include "dbConnect.php";
$conn = OpenCon();

$Return = "";
$ReturnContent = "";

theFunction();

function theFunction() {
	global $Return;
	global $ReturnContent;
	$conn = OpenCon();

	$query = "SELECT id,title,content FROM writes ORDER BY sequence";
	$result = mysqli_query( $conn,$query );

	if(isset($_GET['writes'])){ //If it's the Writes page:
		while ( $title = mysqli_fetch_object( $result ) ){
			$Return .= "<a onclick='openWrite($title->id)'>$title->title</a><br/>"  ;
			$ReturnContent .= "
				<div class='image-text image-text-wrtgs snippet' data-id='$title->id'>
					<h3><a onclick='openWrite($title->id)' >$title->title</a></h3>
					$title->content
				</div>"  ;
		}
		$myObj = new \stdClass();
		$myObj->titles = $Return;
		$myObj->content = $ReturnContent;

		$myJSON = json_encode($myObj);
		echo $myJSON;
	}
	else if(isset($_GET['id'])){   //IF WE'RE GETTING A SPECIFIC STORY:
		$query = "SELECT title,content FROM writes WHERE id=".$_GET['id'];
		$result = mysqli_query( $conn,$query );
		while ( $title = mysqli_fetch_object( $result ) ){
			$Return = mysqli_real_escape_string($conn,stripSlashes($title->title));
			$ReturnContent = mysqli_real_escape_string($conn,stripSlashes($title->content));
		}
		$query = "UPDATE preview SET title='" . $Return . "',`content`='" . $ReturnContent ."' WHERE id=0";
		$result = mysqli_query( $conn,$query ) or die($conn->error);

		$myObj = new \stdClass();
		$myObj->titles = $Return;
		$myObj->content = $ReturnContent;

		$myJSON = json_encode($myObj);
		echo $myJSON;
	}
	else{ //If it's the dashboard:
		while ( $title = mysqli_fetch_object( $result ) ){
			$derezzerStyle = 'z-index:1000;display:none;color: #ffb300;position: absolute;top:12%;left:50%;transform: translateX(-140px);width: 280px;height:90px;border-radius: 20px;border: dashed #ffb300 3px;background:rgba(0,0,0,0.95);font-size: 20pt;text-align: center;padding: 10px;box-shadow:5px 5px 27px 13px rgba(0,0,0,0.74)';
			$Return .= "
				<div class='blak-header-btn paintingRecord'  id='paintingRecord_$title->id' style='positon:relative' data-id='$title->id'>
					<a onclick='openWrite($title->id)' style='cursor:pointer'>$title->title</a> <i class='bi bi-trash deleteSpan' data-id='$title->id'></i>

					<span class='drandle'>CLICK HERE TO DRAG</span>

					<div class='derezzer' id='derezzer_$title->id' style='$derezzerStyle'> Really delete? <br/>
						<div class='hldr' style='width:100%;display: flex;text-align: center;justify-content: space-around;margin-top:10px'>
							<span class='derezzer-no'  id='no'  data-id = '$title->id' style='font-weight:bold;width: 95px;height:32px;border-radius:10px;border:dashed #00bfff 2px;text-align: center;color: #00bfff;font-size: 16pt; cursor:pointer'>NO</span>
							<span class='derezzer-yes' id='yes' data-id = '$title->id' style='font-weight:bold;width: 95px;height:32px;border-radius:10px;border:dashed #ff4000 2px;text-align: center;color: #ff4000;font-size: 16pt;cursor:pointer'>YES</span>
						</div>
					</div>
				</div>"  ;
		}
		echo $Return;
	}
}
?>
