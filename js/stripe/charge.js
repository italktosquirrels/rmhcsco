// Create a Stripe client
var stripe = Stripe('pk_test_JtV6ynbFKItsc8Ifu0OmRApw00aOLVqMbL');
// Create an instance of Elements
var elements = stripe.elements();


$(document).ready(function () {

  //add wards to dropdown menu
  $.ajax({
    url: "php/charge.php",
    type: 'POST',
    data: {
      action: 'wards'
    },
    success: function (data) {
      var obj = JSON.parse(data);
      $.each(obj, function (key, value) {
        // console.log(key + "  " + value);
        $("#dropdown").append("<option value='" + value + "'>" + key + "</option");
      });
    }
  });


  //on click for amount descriptions
  $('#amountButtons input').click(function () {
    $("#donationDescription").css("visibility", "visible");
    $("#receipt").css("visibility", "visible");
    $('#receipt p').html("Anything Under $20 Will Not Receive a Tax Receipt");
    value = $(this).val();
    $('#donationDescriptionImage').html('<img src="img/sickKids.jpg" />');
    if (value == 5) {
      //Remove Span
      $('#donationDescriptionMessage span').remove();
      //Donate Image

      //Donate Description
      $('#donationDescriptionMessage h1').html("A donation of $5 can help provide things like:");
      $('#donationDescriptionMessage p').html("A much-needed snack for a mother to share with her sick daughter. ");
      //Changes Donate Button to Amount Selected
      $('#donate-button').text("Donate $5");

    } else if (value == 10) {
      //Remove Span
      $('#donationDescriptionMessage span').remove();

      //Donate Description
      $('#donationDescriptionMessage h1').html("A donation of $10 can help provide things like:");
      $('#donationDescriptionMessage p').html("A cup of coffee for a father who’s been at his daughter’s bedside for 22 hours.");
      //Changes Donate Button to Amount Selected
      $('#donate-button').text("Donate $10");

    } else if (value == 15) {
      //Remove Span
      $('#donationDescriptionMessage span').remove();

      //Donate Description
      $('#donationDescriptionMessage h1').html("A donation of $15 can help provide things like:");
      $('#donationDescriptionMessage p').html("A fun activity for a sister to share with her little brother on bedrest.");
      //Changes Donate Button to Amount Selected
      $('#donate-button').text("Donate $15");

    } else if (value == 20) {
      //Remove Span
      $('#donationDescriptionMessage span').remove();

      //Donate Description
      $('#donationDescriptionMessage h1').html("A donation of $20 can help provide things like:");
      $('#donationDescriptionMessage p').html("A fun activity for a sister to share with her little brother on bedrest. A much-needed" +
        "snack for a mother to share with her sick daughter.");
      //Changes Donate Button to Amount Selected
      $('#donate-button').text("Donate $20");

    } else if (value == 30) {
      //Remove Span
      $('#donationDescriptionMessage span').remove();

      //Donate Description
      $('#donationDescriptionMessage h1').html("A donation of $30 can help provide things like:");
      $('#donationDescriptionMessage p').html("A fun activity for a sister to share with her little brother on bedrest. A cup of " +
        "coffee for a father who’s been at his daughter’s bedside for 22 hours. A cup of coffee " +
        "for a father who’s been at his daughter’s bedside for 22 hours.");
      //Changes Donate Button to Amount Selected
      $('#donate-button').text("Donate $30");

    } else if (value == "other") {
      $('#donationDescriptionMessage p').html("");
      $('#donate-button').text("Donate");
      //Add Span
      if (!$('#donationDescriptionMessage span').length) {
        $('#donationDescriptionMessage p').after('<span style="float: right;"></span>');
      }

      $('#donationDescriptionMessage h1').html("Thanks for donating to The Happy Wheels Cart. </br> Anything helps.");
      $('#donationDescriptionMessage span').html('<input id="inputAmount" type="number" placeholder="$0.00" />');

    } else {
      $('#donationDescriptionMessage p').html("");
    }

    //Get Values from Selected button
    radioChecked = $('input[name="radioAmount"]:checked').val();
    //If OTHER is Selected
    if (radioChecked == "other") {
      amount = 0;
      $('#inputAmount').change(function () {
        amount = $('#inputAmount').val();
        $('input[name=amount]').val(amount);
        $('#donate-button').text("Donate $" + amount);
      });
      //If Radio Button Amount is Selected
    } else {
      $('input[name=amount]').val(radioChecked);
    }
  });



  // Custom styling can be passed to options when creating an Element.
  // (Note that this demo uses a wider set of styles than the guide below.)
  var style = {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };

  // Style button with BS
  document.querySelector('#payment-form button').classList =
    'btn btn-primary btn-block mt-4';

  // Create an instance of the card Element
  var card = elements.create('card', {
    style: style
  });

  // Add an instance of the card Element into the `card-element` <div>
  card.mount('#card-element');

  // Handle real-time validation errors from the card Element.
  card.addEventListener('change', function (event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });

  // Handle form submission
  $("#payment-form button").click(function (e) {
    event.preventDefault();
    stripe.createToken(card).then(function (result) {
      if (result.error) {
        // Inform the user if there was an error
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server
        stripeTokenHandler(result.token);
      }
      // Submit the form
      $.ajax({
        url: "php/charge.php",
        type: 'POST',
        data: {
          formData: $('#payment-form').serialize(),
          action: 'submit'
        },
        success: function (data) {
          var response = JSON.parse(data);
          if (response.status == "1") {
            //response receives parameters to pass to success.php
            window.location.href = "success.php?tid=" + response.token + "&name=" + response.name + "&ward=" + response.ward;
          } else {
            //repsonse receives error message to display
            $('#form-errors').html(response.message).css("color", "red");
            // if (response.message == "Please provide a first name") {
            //   $('.first-name').css("border", "1.5px solid #dc1d00");
            // }
          }
        }
      });

    });
  });

  //appends token to hidden field
  function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    $("#payment-form").append('<input type="hidden" name="stripeToken" value="' + token.id + '"/>');

  }




});