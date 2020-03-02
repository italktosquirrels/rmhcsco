<?php

//Gloabal Variable
$TPL['results'];
$TPL['error'];
$TPL['success'];



/**
 * Function that inserts a new field into the phonebook Database
 * Returns propgateTable to update view
 */
function insert($conn, $first_name, $last_name, $email, $phone)
{
    try {
        $stmt = $conn->prepare("INSERT INTO phonebook (fname, lname, phone, email) VALUES (?, ?, ?, ?)");
        $stmt->execute([$first_name, $last_name, $email, $phone]);
        return $success = "One Record Was Successfully Inserted";

    } catch (PDOException $e) {
        return $error = "Insert failed: " . $e->getMessage();
        exit();
    }

}


/**
 * Function that takes the arg of the the connection from the app.config.php
 * file. Accessess Databates and Retireves all from phonebook table
 */
function propagateTable($conn)
{
    try
    {
        // build the select query
        $stmt = $conn->prepare("SELECT * FROM phonebook");

        // execute the query, save reference to results
        $stmt->execute();

        // grab results of query for as long as results, store in TPL
        while ($nextRow = $stmt->fetch()) {
            $TPL['results'][] = $nextRow;
        }
        // print_r($TPL['results']);

    } catch (PDOException $e) {
        // echo "Select failed: " . $e->getMessage();
        $TPL['error'] = "Select failed: " . $e->getMessage();
        exit();
    }

    return $TPL['results'];

}

/**
 * Function that sorts each row by field and ASC or DESC order, depending on
 * user input.
 */
function sortBy($conn, $field, $order)
{

    try
    {
        if ($field === 'id' || $field === 'lname' || $field === 'fname' || $field === 'email' || $field === 'phone') {

            // build the select query
            $stmt = $conn->prepare("SELECT * FROM phonebook ORDER BY " . $field . " " . strtoupper($order));

            // execute the query, save reference to results
            $stmt->execute();

            // grab results of query for as long as results, store in TPL
            while ($nextRow = $stmt->fetch()) {
                $TPL['results'][] = $nextRow;
            }
        }

        // echo "<pre>" . print_r($TPL['results']) . "</pre>";

    } catch (PDOException $e) {
        // echo "Select failed: " . $e->getMessage();
        $TPL['error'] = "Select failed: " . $e->getMessage();

        exit();
    }

    return ($TPL['results']);

}




