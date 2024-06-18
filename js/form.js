"use strict";

/*
/************************************
 * method replacement for JQuery
 ************************************

// ** FADE OUT FUNCTION **
function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

// ** FADE IN FUNCTION **
function fadeIn(el) {
    el.style.opacity = 0;
    el.style.display = "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const contactForm = document.getElementById("contactForm");

async function handleSubmit(event) {
  console.log("submit form")
    event.preventDefault();

    // field validation
    const emailField = document.getElementById('email');
    if (!validateEmail(emailField.value)) {
      fadeIn(document.querySelector('#form-message-warning'));
      document.querySelector('#form-message-warning').innerHTML = "Email is not valid.";
      return;
    }

    const submit = document.querySelector('#submit');
    submit.disabled = true;

    const spinner = document.querySelector('#processing');
    spinner.style.display = 'block';

    function displayError(message) {
      console.error(message);
      spinner.style.display = 'none';
      submit.disabled = false;
      fadeIn(document.querySelector('#form-message-warning'));
      document.querySelector('#form-message-warning').innerHTML = "Something went wrong. Please try again.";
    }

    const data = new FormData(event.target);
    fetch({
      type: "POST",
      url: "/contact",
      contentType: "application/x-www-form-urlencoded",
      body: data,      
    }).then(response => {
      if (response === 'Email sent succesfully') {
        document.querySelector('#form-message-warning').hide();


        setTimeout(function() {
          fadeIn(document.querySelector('#form-message-success'));
        }, 1400);
        setTimeout(function() {
          fadeOut(document.querySelector('#form-message-success'));
        }, 8000);

        setTimeout(function() {
          document.querySelector( '#contactForm' ).each(function() {
            this.reset();
          });
        }, 1400);
          
        setTimeout(function() {
          spinner.style.display = 'none';
        }, 1400);

      } else {
        displayError(response);
      }
    }).catch(error => {
      displayError(error);
    });
}

contactForm.addEventListener("submit", handleSubmit)

*/

// Form
const contactForm = function() {
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
