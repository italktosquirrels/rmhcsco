<?php

/**
 * COVE 8 Copyright 2020
 * All Work has been produced by Cove 8
 *
 * This Hanldles all Databse Logic
 */

/**
 * Function that gets total by Ward. Error Handlings
 */

function getTotalByWard($conn)
{
    try
    {
        // Build the select query
        $stmt = $conn->prepare("SELECT SUM(Amount) AS 'Amount', w.Ward_ID, w.Ward_Name, w.Ward_Colour
                                FROM Donation d
                                JOIN Ward w ON d.Ward_ID = w.Ward_ID
                                GROUP BY Ward_ID
                                ORDER BY SUM(AMOUNT) DESC ");

        // Execute the query, save reference to results
        $stmt->execute();

        // Grab results of query for as long as results, store in TPL
        while ($nextRow = $stmt->fetch()) {
            $TPL['results'][] = $nextRow;
        }

    } catch (PDOException $e) {
        //Stores Error Message
        $TPL['error'] = "Select failed: " . $e->getMessage();
        //Killes Connection if fail
        exit();
    }

    return $TPL['results'];

}

/**
 * Function that retrieves Total Amount Donated with Error Handling
 */

function getTotal($conn)
{
    try
    {
        // build the select query
        $stmt = $conn->prepare("SELECT SUM(Amount) AS 'Total' FROM Donation");

        // execute the query, save reference to results
        $stmt->execute();

        // grab results of query for as long as results, store in TPL
        while ($nextRow = $stmt->fetch()) {
            $TPL['results'][] = $nextRow;
        }

    } catch (PDOException $e) {
        //Stores Error Message
        $TPL['error'] = "Select failed: " . $e->getMessage();
        //Killes Connection if fail
        exit();
    }

    return $TPL['results'];

}

/**
 * Function retrieves the total number of donations made with Error Handling
 */

function getTotalDonations($conn)
{
    try
    {
        // Build the select query
        $stmt = $conn->prepare("SELECT COUNT(Donate_ID) AS 'Total' FROM Donation");

        // Execute the query, save reference to results
        $stmt->execute();

        // Grab results of query for as long as results, store in TPL
        while ($nextRow = $stmt->fetch()) {
            $TPL['results'][] = $nextRow;
        }

    } catch (PDOException $e) {
        //Stores Error Message
        $TPL['error'] = "Select failed: " . $e->getMessage();
        //Killes Connection if fail
        exit();
    }

    return $TPL['results'];

}

/**
 * Function that inserts a new field into the phonebook Database
 * Returns propgateTable to update view
 */
function insert($conn, $amount, $date_time, $ward_id)
{
    try {
        // Build the select query
        $stmt = $conn->prepare("INSERT INTO Donation (Amount, Date_Time, Ward_ID) VALUES (?,?,?);");
        // Execute the query, save reference to results
        $stmt->execute([$amount, $date_time, $ward_id]);
        //Returns success Message
        return $success = "One Record Was Successfully Inserted";

    } catch (PDOException $e) {
        //Stores Error Message
        $TPL['error'] = "Insert failed: " . $e->getMessage();
        //Killes Connection if fail
        exit();
    }

}
