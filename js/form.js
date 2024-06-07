"use strict";


// Form
var contactForm = function() {
  if ($('#contactForm').length > 0 ) {

    $("#contactForm").validate( {
      rules: {
        name: "required",
        subject: "required",
        email: {
          required: true,
          email:    true
        },
        message: {
          required:  true,
          minlength: 10
        }
      },
      messages: {
        name:    "Please enter your Name",
        subject: "Please enter your Subject",
        email:   "Please enter a valid Email Address",
        message: "Please enter a message (min 10 characters)"
      },
      
      submitHandler: function(form) {

        function displayError(message) {
          console.error(message);
          $('#form-message-warning').fadeIn();
          spinner.css('display', 'none');
          submit.prop("disabled", false);
          $('#form-message-warning').html("Something went wrong. Please try again.");
        }

        const submit = $('#submit');
        submit.prop("disabled", true);

        const spinner = $('#processing');
        spinner.css('display', 'block');

        $.ajax({     
            type: "POST",
            url: "/contact",
            contentType: "application/x-www-form-urlencoded",
            data: $(form).serialize(),

            success: function(msg) {
              if (msg === 'Email sent succesfully') {
                $('#form-message-warning').hide();

                setTimeout(function(){
                  $('#form-message-success').fadeIn();
                }, 1400);
                setTimeout(function(){
                  $('#form-message-success').fadeOut();
                }, 8000);

                setTimeout(function(){
                  $( '#contactForm' ).each(function() {
                    this.reset();
                  });
                }, 1400);
                
                setTimeout(function(){
                  spinner.css('display', 'none');
                }, 1400);

              } else {
                displayError(msg);
              }
            },
            error: function(err) {
              displayError(err);
            }
          });
        }
    });
  }
};

contactForm();
