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
    $('input[type="password"]').get(0).type = 'text';
    $('#eyeSlash').css('display', 'none');
    $('#eye').css('display', 'block');
  });
  $('#eye').on('click', () => {
    $('.password').get(0).type = 'password';
    $('#eyeSlash').css('display', 'block');
    $('#eye').css('display', 'none');
  });

  // display userInfoModal
  $('.info.circle.icon').on('click', () => {
    $('#userInfoModal')
      .modal({ closable: false })
      .modal('show');
  });

  // activate dropdown
  $('.ui.dropdown').dropdown({ showOnFocus: false });

  // display add modal
  $('.addModalBtn').on('ajax:success', () => {
    $('#addModal').modal('show');
  });

  // textarea size ajustment
  $('#new_message textarea').on('keyup', () => {
    const target = $('#new_message textarea');
    const maxLineHeight = 10;
    const rawTarget = target.get(0);
    let lineHeight = Number(target.attr('rows'));
    while (
      rawTarget.scrollHeight > rawTarget.offsetHeight &&
      lineHeight < maxLineHeight
    ) {
      lineHeight++;
      target.attr('rows', lineHeight);
    }
    while (rawTarget.scrollHeight < rawTarget.offsetHeight && lineHeight > 1) {
      lineHeight--;
      target.attr('rows', lineHeight);
    }
  });

  // sending message action
  $('#new_message').on('keydown', e => {
    e.target.value = e.target.value.trimStart();
    if (e.key == 'Enter' && e.target.value == '') {
      return false;
    }
    if (e.keyCode == 13 && e.target.value !== '') {
      $('#submitMessage').click();
      e.target.value = '';
      $('#new_message').trigger(e);
    }
  });

  // sending image action
  $('#imageIcon').on('change', e => {
    const txt_message = $('message_content').val();
    $('message_content').val('');
    $('#submitMessage').click();
    e.target.value = '';
    $('message_content').val(txt_message);
  });

  // activate conversation-list
  const activeTag = $('.conversation.item.active').data('tab');
  $('[data-tab="' + activeTag + '"]').addClass('active');
  $('.conversation-list .item').tab({
    context: $('.chat-message-list')
  });

  // set chatroom info(username, id)
  $('a.conversation.item').on('click', () => {
    const name = $('.conversation.item.active')
      .children('.title-text')
      .text();
    const id = $('.conversation.item.active')
      .find('input[type="hidden"]')
      .val();
    const url = `/chatrooms/${id}`;
    $('.chat-title span').text(name);
    $('#message_chatroom_id').val(id);
    $('#deleteConvLink').attr('href', url);
    if (window.innerWidth <= 800) {
      $('.chat-container').scrollLeft(9999);
    }
  });

  // activate popup
  $('.sign.out.alternate.icon').popup();
  $('.info.icon').popup();

  // remove notice-color
  $('.conversation-list a').on('click', e => {
    const notice = $(e.target).closest('a');
    notice.find('div').removeClass('notice-color');
  });

  // click edit profile button event
  $('#editProfile').on('click', () => {
    $('#profileMenu').hide();
    $('#userInfoModal .actions').hide();
    $('#userInfoModal')
      .find('.hidden-item')
      .show();
    $('.ui.profile.form')
      .find('input')
      .prop('disabled', false);
  });

  // display user delete modal
  $('#deleteAccount').on('click', () => {
    $('#deleteUserModal').modal('show');
  });

  // display user delete modal
  $('#deleteConversation').on('click', () => {
    $('#deleteConversationModal').modal('show');
  });

  // flash message fade out
  $('#infoMsg').fadeOut(7500);

  // scroll left action
  $('#leftIcon').on('click', () => {
    $('.chat-container').scrollLeft(0);
  });
});
