// Create a Stripe client
var stripe = Stripe('pk_test_JtV6ynbFKItsc8Ifu0OmRApw00aOLVqMbL');
// Create an instance of Elements
var elements = stripe.elements();

$(document).ready(function () {

  //Add calls backend, add wards to dropdown menu
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


  //on hover for amount descriptions
  $('#amountButtons input').mouseover(function(){
    value = $(this).val();
    if(value == 5){
      $('#donationDescription').html("A donation of $5 can help provide things like: " +
      "A much-needed snack for a mother to share with her sick daughter. "); 
    
    } else if(value == 10){
      $('#donationDescription').html("A donation of $10 can help provide things like: " +
      "A cup of coffee for a father who’s been at his daughter’s bedside for 22 hours.");

    } else if (value == 15){
      $('#donationDescription').html("A donation of $15 can help provide things like: " +
      "A fun activity for a sister to share with her little brother on bedrest.");

    } else if (value == 20){
      $('#donationDescription').html("A donation of $20 can help provide things like: " +
      "A fun activity for a sister to share with her little brother on bedrest. A much-needed" +
      "snack for a mother to share with her sick daughter.");

    } else if (value == 30){
      $('#donationDescription').html("A donation of $30 can help provide things like: " + 
      "A fun activity for a sister to share with her little brother on bedrest. A cup of " +
      "coffee for a father who’s been at his daughter’s bedside for 22 hours. A cup of coffee " +
      "for a father who’s been at his daughter’s bedside for 22 hours.");
      
    } else if (value == "other"){
      $('#donationDescription').html("Thanks for donating to The Happy Wheels Cart. Anything helps.");
    } else {
      $('#donationDescription').html("");
    }
});

  $('#amountButtons').mouseleave(function(){
    $('#donationDescription').html("");
  });



  //Process button value
  $('#amountButtons').click(function (e) {
    radioChecked = $('input[name="radioAmount"]:checked').val();
    //if other amount is selected
    if (radioChecked == "other") {
      $('#inputAmount').css("visibility", "visible").focus();
      amount = 0;
      $('#inputAmount').change(function () {
        amount = $('#inputAmount').val();
        $('input[name=amount]').val(amount);
      });
      //if radio button amout is selected
    } else {
      $('#inputAmount').css("visibility", "hidden").val("");
      $('input[name=amount]').val(radioChecked);
    }
  });
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
var form = document.getElementById('payment-form');
form.addEventListener('submit', function (event) {
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
  });
});

function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);
  // Submit the form
  form.submit();
}