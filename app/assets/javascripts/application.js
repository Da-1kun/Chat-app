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
  /**
   * Set flash message fade out time
   */
  $('#infoMsg').fadeOut(7500);

  /**
   * Visualize password
   */
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

  /**
   * Chatroom Initial Settings
   */
  // activate dropdown
  $('.ui.dropdown').dropdown({ showOnFocus: false });
  // activate popup
  $('.sign.out.alternate.icon').popup();
  $('.info.icon').popup();
  // activate conversation-list
  const activeTag = $('.conversation.item.active').data('tab');
  $('[data-tab="' + activeTag + '"]').addClass('active');
  $('.conversation-list .item').tab({
    context: $('.chat-message-list')
  });

  /**
   * Textarea size ajustment
   */
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

  /**
   * Sending message action
   */
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

  /**
   * Sending image action
   */
  $('#imageIcon').on('change', e => {
    const txt_message = $('message_content').val();
    $('message_content').val('');
    $('#submitMessage').click();
    e.target.value = '';
    $('message_content').val(txt_message);
  });

  /**
   * Select Conversation Events
   */
  $('.conversation-list').on('click', 'a.conversation.item', e => {
    // Remove notice-color
    const conversation = $(e.target).closest('a');
    conversation.find('div').removeClass('notice-color');

    // Update unread message count
    const unread = $('.conversation-message.notice-color').length;
    if (unread) {
      $('.msg-count').text(unread);
    } else {
      $('.msg-count').text('');
    }

    // Update active conversation
    let id = '';
    if (conversation.hasClass('active')) {
      id = $('.conversation.item.active')
        .find('input[type="hidden"]')
        .val();
    } else {
      $('a.conversation.item.active').removeClass('active');
      conversation.addClass('active');
      id = $('.conversation.item.active')
        .find('input[type="hidden"]')
        .val();
      $('.ui.tab.active').removeClass('active');
      $('.chat-message-list [data-tab="chatroom_' + id + '"]').addClass(
        'active'
      );
    }

    /**
     * Switch conversation
     * username
     * chatroom_id
     * delete conversation link
     */
    const name = $('.conversation.item.active')
      .children('.title-text')
      .text();
    const url = `/chatrooms/${id}`;
    $('.chat-title span').text(name);
    $('#message_chatroom_id').val(id);
    $('#deleteConvLink').attr('href', url);

    /**
     * Mobile(Screen width <= 800)
     * Swich screen
     */
    if (window.innerWidth <= 800) {
      const listPosition = document.getElementById('chat-container');
      listPosition.scrollLeft = 9999;
    }
  });

  /**
   * Show Modal Events
   */
  // User Info modal
  $('.info.circle.icon').on('click', () => {
    $('#userInfoModal')
      .modal({ closable: false })
      .modal('show');
  });
  // Delete User modal
  $('#deleteAccount').on('click', () => {
    $('#deleteUserModal').modal('show');
  });
  // Delete Conversation modal
  $('#deleteConversation').on('click', () => {
    $('#deleteConversationModal').modal('show');
  });

  /**
   * User Info modal
   * Edit Profile Event
   */
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

  /**
   * Reload
   * User Info modal
   */
  // After update
  $('.ui.profile.form').on('ajax:success', () => {
    location.reload();
  });
  // Cancel update
  $('#cancelBtn').on('click', () => {
    location.reload();
  });

  /**
   * Mobile(Screen width <= 800)
   * Angle Left Icon click Event
   */
  $('#leftIcon').on('click', () => {
    const listPosition = document.getElementById('chat-container');
    listPosition.scrollLeft = 0;
  });
});
