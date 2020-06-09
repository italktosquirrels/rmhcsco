<?php
//https://stripe.com/docs/testing stripe testing numbers
class AmountException extends Exception {};
class NoTokenException extends Exception {};
class FirstNameException extends Exception {};
class LastNameException extends Exception {};
class EmailException extends Exception {};
class InvalidNameException extends Exception {};
class WardException extends Exception {};

include 'config.php';
include 'model.php';
require_once('../vendor/autoload.php');
//   require_once('config/db.php');
//   require_once('lib/pdo_db.php');
//   require_once('models/Customer.php');
//   require_once('models/Transaction.php');


 // Sanitize POST Array
$POST = filter_var_array($_POST, FILTER_SANITIZE_STRING);
$action = $POST['action'];


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

  case ("submit"):
try {

  //sanitize form data
  parse_str($_POST['formData'], $formData);
  $token =  filter_var($formData['stripeToken'], FILTER_SANITIZE_STRING);
  $first_name = filter_var($formData ['first_name'],FILTER_SANITIZE_STRING);;
  $last_name = filter_var($formData ['last_name'],FILTER_SANITIZE_STRING);;
  $email = filter_var($formData ['email'],FILTER_SANITIZE_EMAIL);
  $amount = filter_var($formData ['amount'],FILTER_SANITIZE_NUMBER_INT);
  $ward = filter_var($formData['ward'],FILTER_SANITIZE_STRING);
  
  //check if values are set, if not throw exceptions
  if(empty($amount) || !isset($amount)){
    throw new AmountException();
  }

  if(empty($token) || !isset($token)){
    throw new NoTokenException();
  }

  if(empty($first_name) || !isset($first_name)){
    throw new FirstNameException();
  } else if (!preg_match("/^[a-z ,.'-]+$/i", $first_name)){
    throw new InvalidNameException();
  }

  if(empty($last_name) || !isset($last_name)){
    throw new LastNameException();
  } else if (!preg_match("/^[a-z ,.'-]+$/i", $last_name)){
    throw new InvalidNameException();
  }

  if(empty($email) || !isset($email)){
    throw new EmailException();
  }

  if(empty($ward) || !isset($ward)){
    throw new WardException();
  }

  date_default_timezone_set('America/Toronto');
  $date_time = $date = date('Y-m-d h:i:s a', time());


 \Stripe\Stripe::setApiKey('sk_test_BJJNoaDhqEnjBFP6vE78QXSa00H2xzeLHO');

// Create Customer In Stripe
$customer = \Stripe\Customer::create(array(
  "email" => $email,
  "source" => $token
));

// Charge Customer
$charge = \Stripe\Charge::create(array(
  "amount" => $amount*100,
  "currency" => "cad",
  "description" => "Testing for RMHCSCO",
  "customer" => $customer->id
));


//insert record to database
insert($conn, $amount, $date_time, $ward);

//successful response
//send status, token and first name to ajax call for redirection to success.php
$response = array("status" => "1", "token" => $charge->id, "name" => $first_name, "ward" => $ward);
echo json_encode($response);

//handle thrown exceptions from forms and payement errors
//send error response to form thru ajax
} catch (AmountException $e){
  $response = array("message" => "Please Select an Amount");
  echo json_encode($response);
} catch (NoTokenException $e){
  $response = array("message" => "No token has been processed. Please try again.");
  echo json_encode($response);
} catch (FirstNameException $e){
  $response = array("message" => "Please provide a first name");
  echo json_encode($response);
} catch (LastNameException $e){
  $response = array("message" => "Please provide a last name");
  echo json_encode($response);
} catch (EmailException $e){
  $response = array("message" => "Please provide an email");
  echo json_encode($response);
} catch (InvalidNameException $e){
  $response = array("message" => "Your first and last  name should only contain letters, dashes and apastrophes.");
  echo json_encode($response);
} catch (WardException $e){
  $response = array("message" => "Please select a ward");
  echo json_encode($response);
} catch(\Stripe\Exception\CardException $e) {
  //Since it's a decline, \Stripe\Exception\CardException will be caught
  $response = array("message" => $e->getError()->message);
  echo json_encode($response);
} catch (\Stripe\Exception\RateLimitException $e) {
  // Too many requests made to the API too quickly
  $response = array("message" => $e->getError()->message);
  echo json_encode($response);
} catch (\Stripe\Exception\InvalidRequestException $e) {
   // Invalid parameters were supplied to Stripe's API
  $response = array("message" => $e->getError()->message);
  echo json_encode($response);
} catch (\Stripe\Exception\AuthenticationException $e) {
   // Authentication with Stripe's API failed
  // (maybe you changed API keys recently)
  $response = array("message" => $e->getError()->message);
  echo json_encode($response);
} catch (\Stripe\Exception\ApiConnectionException $e) {
  // Network communication with Stripe failed
  $response = array("message" => $e->getError()->message);
  echo json_encode($response);
} catch (\Stripe\Exception\ApiErrorException $e) {
  /// Display a very generic error to the user, and maybe send
  // yourself an email
  $response = array("message" => $e->getError()->message);
  echo json_encode($response);
} catch (Exception $e) {
  // Something else happened, completely unrelated to Stripe
  $response = array("message" => $e->getError()->message);
  echo json_encode($response);
}
  default:
  break;
}
} else {
  echo array("message" => "An unknown error has occured. Please reload the page and try again.");
}


//code can be used to pass to database

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