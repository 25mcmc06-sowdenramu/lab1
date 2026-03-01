$(document).ready(function() {
  $.getJSON('form.json', function(data) {
    var formHtml = '';
    $.each(data.fields, function(index, field) {
      if (field.conditional) {
        formHtml += '<div class="conditional-field" data-field="' + field.conditional.field + '" data-value="' + field.conditional.value + '">';
      } else {
        formHtml += '<div>';
      }
      formHtml += '<label>' + field.label + '</label>';
      if (field.type === 'select') {
        formHtml += '<select name="' + field.name + '">';
        $.each(field.options, function(index, option) {
          formHtml += '<option value="' + option.value + '">' + option.label + '</option>';
        });
        formHtml += '</select>';
      } else {
        formHtml += '<input type="' + field.type + '" name="' + field.name + '">';
      }
      if (field.required) {
        formHtml += '<span class="error-message">This field is required</span>';
      }
      formHtml += '</div>';
    });
    $('#dynamic-form').html(formHtml);

    $('select[name="state"]').on('change', function() {
      var state = $(this).val();
      $('.conditional-field').hide();
      $('.conditional-field[data-field="state"][data-value="' + state + '"]').show();
    });

    $('#dynamic-form').on('submit', function(event) {
      event.preventDefault();
      var isValid = true;
      $(this).find('input, select').each(function() {
        if ($(this).attr('required') && $(this).val() === '') {
          $(this).next('.error-message').show();
          isValid = false;
        } else {
          $(this).next('.error-message').hide();
        }
      });
      if (isValid) {
        alert('Form is valid!');
      }
    });
  });
});