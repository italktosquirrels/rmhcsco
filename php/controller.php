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

/**
 * SWITCH CASE FOR AJAX CALLS
 */

if (isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    switch ($action) {
        case 'donate':
            insert($conn, $amount, $date_time, $ward_id);
            break;

        case 'metrics':
            $data['totalByWard'] = getTotalByWard($conn);
            $data['totalAmountDonated'] = getTotal($conn);
            $data['totalDonations'] = getTotalDonations($conn);
            echo json_encode($data);

            break;

        // case 'total':
        //     getTotal($conn);
        //     break;

    }
}
