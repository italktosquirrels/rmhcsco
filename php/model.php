<?php

//Gloabal Variable

/**
 * Function that inserts a new field into the phonebook Database
 * Returns propgateTable to update view
 */

function getTotalByWard($conn)
{
    try
    {
        // build the select query
        $stmt = $conn->prepare("SELECT SUM(Amount) AS 'Total', w.Ward_ID, w.Ward_Name
                                FROM Donation d
                                JOIN Ward w ON d.Ward_ID = w.Ward_ID
                                GROUP BY Ward_ID
                                ORDER BY SUM(AMOUNT) DESC ");

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
function insert($conn, $amount, $date_time, $ward_id)
{
    try {
        $stmt = $conn->prepare("INSERT INTO Donation (Amount, Date_Time, Ward_ID) VALUES (?,?,?);");
        $stmt->execute([$amount, $date_time, $ward_id]);
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
