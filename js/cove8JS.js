// Loads when document when ready
$(document).ready(function () {

    metricsCall();

    // setInterval(metricsCall, 5000);

    /**
     * Ajax call to get metrics from database
     */
    function metricsCall() {
        var rank = 1;
        var styles_li = {
            height: "63.63px",
            // "text-transform": "uppercase"
        };

        var styles_span1 = {
            "font-family": 'Futura Bold',
            "font-size": "1vw",
            padding: "0px 15px",
            // "padding-left": "15px"
        };

        var styles_span2 = {
            "font-size": "1vw",
            "font-family": 'Futura',
            // padding: "5px",
        };

        var styles_span3 = {
            "font-family": 'Futura Bold',
            "font-size": "1vw",
            "text-align": "right",
            padding: "15px 0px 0px 15px",
        };

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
                console.log(data.totalAmountDonated[0].Total);
                $("#total_donation_amount").text("$" + data.totalAmountDonated[0].Total + ".00");
                console.log(data.totalDonations[0].Total);
                $("#total_donations").text(data.totalDonations[0].Total);

                $.each(data.totalByWard, function (key, value) {
                    $(".sidebar").append('<li style="border-bottom: 1.5px solid ' + data.totalByWard[key].Ward_Colour + ';border-left: 5px solid ' +
                        data.totalByWard[key].Ward_Colour + ';"><span class="span1">' + rank + '</span><span class="span2">' + data.totalByWard[key].Ward_Name + '</span><span class="span3">$' + data.totalByWard[key].Amount + '.00</span></li > ');
                    // console.log(rank, data.totalByWard[key].Ward_Name, data.totalByWard[key].Amount, data.totalByWard[key].Ward_Colour);
                    console.log('<li style="border-bottom: 3px solid ' + data.totalByWard[key].Ward_Colour + '; border-left: 10px solid ' + data.totalByWard[key].Ward_Colour + ';"><span id="span1">' + rank + '</span>' + data.totalByWard[key].Ward_Name + ' ' + data.totalByWard[key].Amount + '</li>');

                    rank++;
                });

                $(".sidebar li").css(styles_li);
                $(".span1").css(styles_span1);
                $(".span2").css(styles_span2);
                $(".span3").css(styles_span3);


            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                $("#top_ward").text("Data Not Available");
                $("#total_donation_amount").text("Data Not Available");
                $("#total_donations").text("Data Not Available");
            }
        });

    }



});