<?php

// turn off notices, warnings, deprecated errors
// error_reporting(E_ALL ^ (E_NOTICE | E_WARNING | E_DEPRECATED));

/* DB header info */
// $user = 'root';
// $password = 'root';
// $db = '000759190';
// $host = 'localhost';
// $port = 8888;

//new PHP Data Object //This allows PHP to interact with a database

$user = 'italkt5_cove8';
$pass = 'Cove_8Cove_8';

// $dbh = new PDO('mysql:host=localhost;dbname=test', $user, $pass);

try
{
    // echo "HELLO";
    $conn = new PDO('mysql:host=ecbiz126.inmotionhosting.com;dbname=italkt5_rmhcsco', $user, $pass);

    // $conn = new PDO("mysql:host=" . $DB['server'] . ";dbname=" . $DB['database'] . "," . $DB['username'], $DB['password']);

    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // have my fetch data returned as an associative array
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    echo "Success";

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}
