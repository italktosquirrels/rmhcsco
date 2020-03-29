// Ward Array
wardsList ={
  "Chedoke-Cootes" :1,
  "Downtown":2,
  "Hamilton Centre" :3,
  "East Hamilton" :4,
  "Redhill" :5,
  "East Mountain" :6,
  "Central Mountain":7,
  "West/Central Mountain" :8,
  "Upper Stoney Creek" :9, 
  "Lower Stoney Creek":10,
  "Glanbrook" :11,
  "Ancaster Area" :12, 
  "Dundas Area" :13,
 "West Mountain" :14,
  "Flamborough East" :15}

// Create a Stripe client
var stripe = Stripe('pk_test_JtV6ynbFKItsc8Ifu0OmRApw00aOLVqMbL');
// Create an instance of Elements
var elements = stripe.elements();

//Add wards to dropdown menu
$.each(wardsList, function(key, value) {
  $("#dropdown").append("<option value='" + value + "'>" + key +"</option");
});

$(document).ready(function(){

   //Process button value
   $('#amountButtons').click(function(e){
    radioChecked = $('input[name="radioAmount"]:checked').val();
    //if other amount is selected
    if (radioChecked == "other"){
      $('#inputAmount').css("visibility", "visible");
      amount = 0;
        $('#inputAmount').change(function(){   
          amount = $('#inputAmount').val();
          console.log(amount);
          $('input[name=amount]').val(amount);
        });
    //if radio button amout is selected
    } else {
      $('#inputAmount').css("visibility", "hidden").val("");
      console.log(radioChecked);
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
var card = elements.create('card', { style: style });

// Add an instance of the card Element into the `card-element` <div>
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
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