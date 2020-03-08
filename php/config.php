<?php

$host = 'ecbiz126.inmotionhosting.com';
$database = 'italkt5_rmhcsco';
$user = 'italkt5_cove8';
$pass = 'Cove_8Cove_8';

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
