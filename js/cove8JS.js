// Loads when document when ready
$(document).ready(function () {

    // AJAX CALL - For Metrics Bars
    $('metricsBar').load("controller.php", {
        Amount: "",
        DateTime: "",
        Ward: ""
    })

    // AJAX CALL - When Donation Made
    $('donateButton').click(function () {
        $('').load("controller.php", {
            Amount: "",
            DateTime: "",
            Ward: ""
        })
    })


    /**
     * FACEBOOK FUNCTION
     */

    $(".facebook").click(function () {
        alert("Handler for .click() called.");
    });

    $.getJSON("facebook.php", function (json) {
        console.log("JSON Data: " + json);
    });





});