//= require_self

$(document).on('turbolinks:load', () => {
  $('#photoLink').on('change', e => {
    // get file object
    const file = e.target.files[0];
    const reader = new FileReader();

    // check whether image file is selected
    if (file.type.indexOf('image') < 0) {
      alert('Select a image file');
      return false;
    }

    // setting image
    reader.onload = (file => {
      return e => {
        $('#photoArea').attr('src', e.target.result);
        $('#photoArea').attr('title', file.name);
      };
    })(file);
    reader.readAsDataURL(file);
  });
});
