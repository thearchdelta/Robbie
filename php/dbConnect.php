<?php
/*
$link = mysql_connect('angryroommatescom.ipagemysql.com', 'themba', 'peniel');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
mysql_connect("internal-db.s207902.gridserver.com", "db207902_jen", "Jbmediat1!");
mysql_select_db("db207902_jen_burkin");
*/


/*---------------FOR MEDIATEMPLE-----------*/
/*
function OpenCon()
 {
 $dbhost = "internal-db.s207902.gridserver.com";
 $dbuser = "db207902_jen";
 $dbpass = "Jbmediat1!";
 $db =     "db207902_jen_burkin";
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
