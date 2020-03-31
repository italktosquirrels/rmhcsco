<?php

/**
 * COVE 8 Copyright 2020
 * All Work has been produced by Cove 8
 * 
 * This file establishes a connection to the database
 */

$DB['server'] = 'ecbiz126.inmotionhosting.com';
$DB['database'] = 'italkt5_rmhcsco';
$DB['username'] = 'italkt5_cove8';
$DB['password'] = 'Cove_8Cove_8';

try
{
    //Creates Connnection to Database
    $conn = new PDO("mysql:host=" . $DB['server'] . ";dbname=" . $DB['database'], $DB['username'], $DB['password']);

    //Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //Have my fetch data returned as an associative array
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}
