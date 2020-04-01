<?php

/**
 * COVE 8 Copyright 2020
 * All Work has been produced by Cove 8
 *
 * This hanldles all data and connects using ajax to the COVE8JS file
 */

//Database Connection
include 'config.php';

//Fucntions and Database Logic
include 'model.php';

/**
 * SWITCH CASE FOR AJAX CALLS
 */

 //Gets Action Type
if (isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    switch ($action) {

        // Gets All Metrics From Database and stores in json file. Ajax Call retiries action and switch case of metrics
        case 'metrics':
            $data['totalByWard'] = getTotalByWard($conn);
            $data['totalAmountDonated'] = getTotal($conn);
            $data['totalDonations'] = getDonationsCount($conn);
            $data['allDonationInfo'] = getAllDonationInfo($conn);
            echo json_encode($data);

            break;

    }
}
