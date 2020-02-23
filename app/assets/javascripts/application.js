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
  // visualize password
  $('#eyeSlash').on('click', () => {
    $('#session_password').get(0).type = 'text';
    $('#eyeSlash').css('display', 'none');
    $('#eye').css('display', 'block');
  });
  $('#eye').on('click', () => {
    $('#session_password').get(0).type = 'password';
    $('#eyeSlash').css('display', 'block');
    $('#eye').css('display', 'none');
  });

  // display add modal
  $('.addModalBtn').on('ajax:success', () => {
    $('.modal').modal('show');
  });

  // textarea ajustment
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

  // sending message action
  $('#new_message').on('keydown', e => {
    if(e.keyCode == 13) {
      $('#submitMessage').click();
      e.target.value = "";
      return false;
    }
  })

  // activate conversation-list
  const activeTag = $('.conversation.item.active').data('tab');
  $('[data-tab="' + activeTag + '"]').addClass('active');
  $('.conversation-list .item').tab({
      context: $('.chat-message-list')
  });

  // set chatroom info(username, id)
  $('a.conversation.item').on('click', () => {
    const name = $('.conversation.item.active').children('.title-text').text();
    const id = $('.conversation.item.active').find('input[type="hidden"]').val();
    $('.chat-title span').text(name);
    $('#message_chatroom_id').val(id);
  });

  // activate logout popup
  $('.sign.out.alternate.icon').popup();
  $('.info.icon').popup();

  // remove notice-color
  $('.conversation-list a').on('click', e => {
    const notice = $(e.target).closest('a');
    notice.find('div').removeClass('notice-color');
  });
});