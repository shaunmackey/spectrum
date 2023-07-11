$(document).ready(function () {

  function validateInput(input, placeholder, minLength) {
    const value = $(`#${input}`).val();
    if (value.length < minLength || value === placeholder) {
      $(`#${input}`).after(`<span class="error">Your ${input} should be at least ${minLength} characters.</span>`);
      return true;
    }
    return false;
  }

  function validateEmail(email) {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return !regex.test(email);
  }

  function validatePhone(phone) {
    const regex = /^\d{7,}$/;
    return !regex.test(phone);
  }

  const inputFields = ['name', 'email', 'phone'];

  inputFields.forEach(field => {
    const $field = $(`#${field}`);
    const placeholderText = $field.attr('placeholder');

    $field.focus(function() {
      $field.attr('placeholder', '');
    });

    $field.blur(function() {
      $field.attr('placeholder', placeholderText);
    });
  });

  $("#spectrum_form").submit(function (e) {
    e.preventDefault();

    $("#spectrum_form .error").remove();

    let formError1 = validateInput('name', 'Name', 2);
    let formError2 = validateInput('email', 'Email Address', 5) || validateEmail($("#email").val());
    let formError3 = validateInput('phone', 'Phone Number', 7) || validatePhone($("#phone").val());

    if (formError2) {
      $("#email").after(`<span class="error">Enter a valid email address. </span>`);
    }
    if (formError3) {
      $("#phone").after(`<span class="error">Enter a valid phone number. </span>`);
    }

    if (!formError1 && !formError2 && !formError3) {
      $(".form-wrapper").hide();
      $(".form-success").show();
    }
  });
});

