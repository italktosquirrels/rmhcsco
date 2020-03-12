<?php
//Database Connection
include 'config.php';

//Fucntions and Database Logic
include 'model.php';

//GLOBAL VARIABLES

$facebook[] = array(
    "Make Donation" => array(
        "title" => "Make A Donation to Help Sick Kids in Hamilton.",
        "message" => "The Happy Wheels Cart, stocked with snacks, drinks, toys and activities, travels room to room to provide a much-needed break for parents and children unable to leave their hospital beds. Donate today.",
        "image" => "img/heart-sketch.svg"
    ),
    "Made Donation" => array(
        "title" => "My Donation Helps Sick Kids in Hamilton.",
        "message" => "The Happy Wheels Cart, stocked with snacks, drinks, toys and activities, travels room to room to provide a much-needed break for parents and children unable to leave their hospital beds. Donate today.",
        "image" => "img/heart-sketch.svg"
    ),
    "Share Map" => array(
        "title" => "The Happy Wheels Cart is in town!",
        "message" => "The Happy Wheels Cart, stocked with snacks, drinks, toys and activities, travels room to room to provide a much-needed break for parents and children unable to leave their hospital beds. Donate today to help keep families close, room by room.",
        "image" => "img/heart-sketch.svg"
));


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
