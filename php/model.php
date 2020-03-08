<?php

//Gloabal Variable
$TPL['results'];
$TPL['error'];
$TPL['success'];
//DID THIS WORK?

function getData($conn)
{
    try
    {
        // build the select query
        $stmt = $conn->prepare("SELECT * FROM italkt5_rmhcsco");

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
