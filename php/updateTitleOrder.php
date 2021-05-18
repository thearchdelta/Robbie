<?php
include "dbConnect.php";
$conn = OpenCon();
$Query = "";

if(isset($_POST["data"]))
{
    $data = json_decode($_POST["data"]);
    $myarray = $data->myarray;
    foreach($myarray as $entry)
    {
        // do something
        // $Query = "cat_order = '" . mysqli_real_escape_string($conn,stripSlashes($entry['index'])) . "' WHERE id = ".$entry['id'] . ",";
        $Query = "UPDATE writes SET sequence = '$entry->index' WHERE id = $entry->id;";
        mysqli_query($conn, $Query );
        echo $Query;
    }
}
?>
