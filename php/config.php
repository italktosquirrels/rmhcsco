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

$DB['server'] = 'localhost';
$DB['port'] = '8888';
$DB['database'] = '000759190';
$DB['username'] = 'root';
$DB['password'] = 'root';

try
{
    $conn = new PDO("mysql:host=" . $DB['server'] . ";dbname=" . $DB['database'] . ";port=" . $DB['port'],
        $DB['username'],
        $DB['password']);

    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // have my fetch data returned as an associative array
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}