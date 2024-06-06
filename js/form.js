(function($) {
  "use strict";

  // Form
  var contactForm = function() {
    if ($('#contactForm').length > 0 ) {
      $( "#contactForm" ).validate( {
        rules: {
          name: "required",
          subject: "required",
          email: {
            required: true,
            email: true
          },
          message: {
            required: true,
            minlength: 10
          }
        },
        messages: {
          name:    "Please enter your name",
          subject: "Please enter your subject",
          email:   "Please enter a valid email address",
          message: "Please enter a message (min 10 characters)"
        },
        /* submit via ajax */
        
        submitHandler: function(form) {    
          const spinner = $('.processing');

          $.ajax({     
              type: "POST",
              url: "https://contactform.frederic-henri.workers.dev/",
              data: $(form).serialize(),

              beforeSend: function() { 
                spinner.css('display', 'block');
              },
              success: function(msg) {
                if (msg == 'OK') {
                  $('#form-message-warning').hide();
                  setTimeout(function(){
                    $('#contactForm').fadeIn();
                  }, 1000);
                  setTimeout(function(){
                    $('#form-message-success').fadeIn();   
                  }, 1400);

                  setTimeout(function(){
                    $('#form-message-success').fadeOut();   
                  }, 8000);

                  setTimeout(function(){
                    $submit.css('display', 'none');
                  }, 1400);

                  setTimeout(function(){
                    $( '#contactForm' ).each(function() {
                      this.reset();
                    });
                  }, 1400);
                     
                } else {
                  $('#form-message-warning').html(msg);
                  $('#form-message-warning').fadeIn();
                  spinner.css('display', 'none');
                }
              },
              error: function() {
                $('#form-message-warning').html("Something went wrong. Please try again.");
                $('#form-message-warning').fadeIn();
                spinner.css('display', 'none');
              }
            });        
          }
      });
    }
  };
  contactForm();

})(jQuery);
