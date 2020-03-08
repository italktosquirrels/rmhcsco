<?php

$DB['server'] = 'ecbiz126.inmotionhosting.com';
$DB['database'] = 'italkt5_rmhcsco';
$DB['username'] = 'italkt5_cove8';
$DB['password'] = 'Cove_8Cove_8';

try
{

    $conn = new PDO("mysql:host=" . $DB['server'] . ";dbname=" . $DB['database'], $DB['username'], $DB['password']);

    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // have my fetch data returned as an associative array
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}
