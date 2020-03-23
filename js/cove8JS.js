// Loads when document when ready
$(document).ready(function () {

    console.log("PAGE LOADED")
    // AJAX CALL - For Metrics Bars
    $.ajax({
        url: './php/controller.php',
        type: 'post',
        data: {
            action: 'total_by_ward'
        },
        dataType: 'text',
        success: function (data) {
            console.log(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });

});