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


switch ($ward){
  case "Hi":
  break;
}


// insert($conn, $amount, $date_time, $email, $ward);
insert($conn, $amount, $date_time, $ward);


//Redirect to success
header("Location: success.php?tid=".$charge->id. "&product=" .$charge->description. "&name=" .$first_name ."&ward=". $ward);

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