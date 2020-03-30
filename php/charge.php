<?php

include 'config.php';
include 'model.php';
require_once('../vendor/autoload.php');
//   require_once('config/db.php');
//   require_once('lib/pdo_db.php');
//   require_once('models/Customer.php');
//   require_once('models/Transaction.php');

// var_dump($_POST);
// die();


$action = $_POST['action'];

if(!empty($action) and isset($action)){
switch ($action){ 
  case("wards"):
    $wardList = array("Chedoke-Cootes" =>1,
    "Downtown"=>2,
    "Hamilton Centre" =>3,
    "East Hamilton" =>4,
    "Redhill" =>5,
    "East Mountain" =>6,
    "Central Mountain"=>7,
    "West/Central Mountain" =>8,
    "Upper Stoney Creek" =>9, 
    "Lower Stoney Creek"=>10,
    "Glanbrook" =>11,
    "Ancaster Area" =>12, 
    "Dundas Area" =>13,
    "West Mountain" =>14,
    "Flamborough East" =>15);
    echo json_encode($wardList);
  break; 
  default:
  break;
}
} else {

 \Stripe\Stripe::setApiKey('sk_test_BJJNoaDhqEnjBFP6vE78QXSa00H2xzeLHO');

  // Sanitize POST Array
 $POST = filter_var_array($_POST, FILTER_SANITIZE_STRING);
 $first_name = $POST['first_name'];
 $last_name = $POST['last_name'];
 $email = $POST['email'];
 $amount = $POST['amount'];
 $ward = $POST['ward'];
 $token = $POST['stripeToken']; 
 date_default_timezone_set('America/Toronto');
 $date_time = $date = date('Y-m-d h:i:s a', time());



// Create Customer In Stripe
$customer = \Stripe\Customer::create(array(
  "email" => $email,
  "source" => $token
));

// Charge Customer
$charge = \Stripe\Charge::create(array(
  "amount" => $amount*100,
  "currency" => "usd",
  "description" => "Testing for RMHCSCO",
  "customer" => $customer->id
));

//insert record to database
insert($conn, $amount, $date_time, $ward);

//Redirect to success
header("Location: ../success.php?tid=".$charge->id. "&product=" .$charge->description. "&name=" .$first_name ."&ward=". $ward);
}

// // Customer Data
// $customerData = [
//   'id' => $charge->customer,
//   'first_name' => $first_name,
//   'last_name' => $last_name,
//   'email' => $email
// ];

// // Instantiate Customer
// $customer = new Customer();

// // Add Customer To DB
// $customer->addCustomer($customerData);


// // Transaction Data
// $transactionData = [
//   'id' => $charge->id,
//   'customer_id' => $charge->customer,
//   'product' => $charge->description,
//   'amount' => $charge->amount,
//   'currency' => $charge->currency,
//   'status' => $charge->status,
// ];

// // Instantiate Transaction
// $transaction = new Transaction();

// // Add Transaction To DB
// $transaction->addTransaction($transactionData);

// // Redirect to success
// header('Location: php/success.php?tid='.$charge->id.'&product='.$charge->description);