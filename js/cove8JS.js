/* ******************************
    COVE 8 MAIN JS FILE

    Elizabeth Southward
    Bartosz Wojcik
    Johns Varughese Meppurath
    Aleksandar Spasic

******************************* */

$(document).ready(function () {


    //Calls Funtion at Page Load
    metricsCall();

    //Calls Funtion every 5 Seconds
    // setInterval(metricsCall, 5000);


    /**
     * Ajax call to get metrics from database
     */
    function metricsCall() {
        var rank = 1;
        $.ajax({
            url: './php/controller.php',
            type: 'post',
            data: {
                action: 'metrics'
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $("#top_ward").text(data.totalByWard[0].Ward_Name);
                // console.log(data.totalAmountDonated[0].Total);
                $("#total_donation_amount").text("$" + data.totalAmountDonated[0].Total + ".00");
                // console.log(data.totalDonations[0].Total);
                $("#total_donated").text(data.totalDonations[0].Total);
                // console.log(data.totalDonations[0].);

                $("#sidebar-col").empty();
                $.each(data.totalByWard, function (key, value) {
                    $("#sidebar-col").append('<div class="sidebar-col-grid"  ward="' + data.totalByWard[key].Ward_ID + '" style="border-bottom: 1.5px solid ' + data.totalByWard[key].Ward_Colour + ';border-left: 5px solid ' +
                            data.totalByWard[key].Ward_Colour + ';">' +
                            '<div class="rank"><h1>' + rank + '</h1></div>' +
                            '<div class="ward-name"><p>' + data.totalByWard[key].Ward_Name + '</p></div>' +
                            '<div class="ward-number"><p> Ward # ' + data.totalByWard[key].Ward_ID + '</p></div>' +
                            '<div class="amount"><p>$' + data.totalByWard[key].Amount + '.00</p></div>' +
                            '</div>'),
                        // console.log('<li style="margin-top: 5px; border-bottom: 1.5px solid ' + data.totalByWard[key].Ward_Colour + ';border-left: 5px solid ' +
                        //     data.totalByWard[key].Ward_Colour + ';"><span class="span1">' + rank + '</span><span class="span2">' + data.totalByWard[key].Ward_Name + '</span></br><span class="span3">$' + data.totalByWard[key].Amount + '.00</span></li > ');

                        rank++;
                });

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                $('#top_ward').text("Data Not Available");
                $('#total_donation_amount').text("Data Not Available");
                $('#total_donated').text("Data Not Available");
            }
        });

    }

});