<?php
/*---------------FOR MEDIATEMPLE-----------*/
/*
function OpenCon()
 {
 $dbhost = "internal-db.s207902.gridserver.com";
 $dbuser = "db207902";
 $dbpass = "and(1)Rock!";
 $db =     "db207902_robbie";
 $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);

 return $conn;
 }

function CloseCon($conn)
 {
 $conn -> close();
 }
*/

/*---------------FOR LOCAL DEVELOPMENT-----------*/
function OpenCon()
 {
   $db =     "robbie";
   $dbuser = "root";
   $dbhost = "localhost";
   $dbpass = "";
   $conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);
   return $conn;
 }

function CloseCon($conn)
 {
 $conn -> close();
 }

?>
