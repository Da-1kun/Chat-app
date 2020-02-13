// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require activestorage
//= require turbolinks
//= require semantic-ui
//= require_tree ./channels
//= require_tree .

$(document).on('turbolinks:load', () => {
  $('.addModalBtn').on('click', () => {
    $('.modal').modal('show');
  });

  $('#new_message textarea').on('keyup', () =>{
    const target = $("#new_message textarea");
    const maxLineHeight = 10;
    const rawTarget = target.get(0);
    let lineHeight = Number(target.attr("rows"));
    while (rawTarget.scrollHeight > rawTarget.offsetHeight && lineHeight < maxLineHeight){
        lineHeight++;
        target.attr("rows", lineHeight);
    }
    while (rawTarget.scrollHeight < rawTarget.offsetHeight && lineHeight > 1){
      lineHeight--;
      target.attr("rows", lineHeight);
  }
  });

  $('#new_message').on('keydown', e => {
    if(e.keyCode == 13) {
      $('input[type="submit"]').click();
      e.target.value = "";
      return false;
    }
  })
});