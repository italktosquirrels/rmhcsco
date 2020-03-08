<?php

//Sample Database Connection Script
//Setup connection variables, such as database username
//and password

$hostname = "ecbiz126.inmotionhosting.com";
$username = "italkt5_cove8";
$password = "Cove_8Cove_8";
$dbname = "italkt5_rmhcsco";
$usertable = "Donation";

echo "HELLO";

//Connect to the database
$connection = mysql_connect($hostname, $username, $password);
mysql_select_db($dbname, $connection);

//Setup our query
$query = "SELECT * FROM $usertable";

//Run the Query
$result = mysql_query($query);

//If the query returned results, loop through
// each result

if ($result) {while ($row = mysql_fetch_array($result)) {$name = $row["$yourfield"];
    echo "Name: " . $name;
}} else {
    echo "FAILED";
}
