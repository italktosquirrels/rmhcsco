<?php

/**
 * COVE 8 Copyright 2020
 * All Work has been produced by Cove 8
 *
 * This hanldles all data and connects using ajac to the COVE8JS file
 */

//Database Connection
include 'config.php';

//Fucntions and Database Logic
include 'model.php';

//GLOBAL VARIABLES

/**
 * LOADS DATA FROM DATABSE / ENCODES TO JSON
 */

//Gets Database Results
$TPL['results'] = getTotalByWard($conn);

print_r($TPL['results']);

//Encodes Results to JSON Object
json_encode($TPL['results']);

/**
 * POST DATA RETREIVED WHEN DONATION MADE
 */

$TPL['post'] = json_decode($_POST['donation']);

if (isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    switch ($action) {
        case 'donate':
            insert($conn, $amount, $date_time, $ward_id);
            break;

        case 'total_by_ward':

            break;

        case '':
            break;

    }
}
