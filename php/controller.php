<?php
//Include Database Connection
include 'config.php';

//Include Fucntions and Database Logic
include 'model.php';

//GLOBAL VARIABLES
$TPL['input_error'] = null;
$TPL['success'] = null;
$TPL['error'] = null;
$id = null;
$TPL['deleteID'];

//Stores propgate function (SELECT ALL) in the TPL variable
$TPL['results'] = getData($conn);

$TPL['controller'] = $_SERVER['PHP_SELF'];

/**
 * Switch to handle each case of CRUD functionality
 */
switch ($_REQUEST['act']) {

    case 'sortby':

        $TPL['results'] = sortBy($conn, $_REQUEST['field'], $_REQUEST['order']);

        break;

    // Create/Insert a new person into database
    case 'create':

        if (isset($_POST['insert'])) {

            $last_name = filter_input(INPUT_POST, 'last_name', FILTER_SANITIZE_STRING);
            $first_name = filter_input(INPUT_POST, 'first_name', FILTER_SANITIZE_STRING);
            $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
            $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);

            if (strlen($last_name) < 5 || strlen($last_name) < 5 || preg_match('/\s/', $last_name)) {
                $TPL['input_error']['lname'] = "Invalid Name: Last Name must be 5 - 15 Characters With No Spaces";

            } else if (strlen($first_name) < 5 || strlen($first_name) < 5 || preg_match('/\s/', $first_name)) {
                $TPL['input_error']['fname'] = "Invalid Name: Last Name must be 5 - 15 Characters With No Spaces";

            } else if (empty($email) || preg_match('^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$', $email)) {
                $TPL['input_error']['email'] = "Invalid Email";

            } else if (preg_match('^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$', $phone)) {
                $TPL['input_error']['phone'] = "Invalid Phone";

            } else {
                $message = insert($conn, $first_name, $last_name, $email, $phone);

                if ($message === "One Record Was Successfully Inserted") {
                    $TPL['success'] = $message;
                } else {
                    $TPL['error'] = $message;
                }

                $TPL['results'] = getData($conn);
            }
        }

    default:

}

// Code that needs to be executed no matter what action above occurred
// can be placed here...
//

//Include App View
include 'app.view.php';
