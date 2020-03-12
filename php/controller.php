<?php
//Database Connection
include 'config.php';

//Fucntions and Database Logic
include 'model.php';

//GLOBAL VARIABLES


/**
 * LOADS DATA FROM DATABSE / ENCODES TO JSON
 */

//Gets Database Results
$TPL['results'] = getData($conn);

//Encodes Results to JSON Object
json_encode($TPL['results']);

/**
 * POST DATA RETREIVED WHEN DONATION MADE
 */

$TPL['post'] = json_decode($_POST['donation']);
