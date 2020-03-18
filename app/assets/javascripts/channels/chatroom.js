$(document).on('turbolinks:load', () => {
  const room_count = $('.conversation.item').length;
  const userId = $('#currentUserId').val();
  subscription(room_count);

  function subscription(room_count) {
    for (let i = 1; i <= room_count; i++) {
      App.messages = App.cable.subscriptions.create(
        { channel: 'MessagesChannel', room: $('#chatroom_idx_' + i).val() },
        {
          received: data => {
            const msg = data['message'];
            const image = msg.image.url;
            const conversation = $(
              '.conversation-list [data-tab="chatroom_' + msg.chatroom_id + '"]'
            );
            const other_photo = conversation.find('img').attr('src');
            const message_text = `<div class="message-text">
                                      ${msg.content}
                                  </div>
                                  `;
            let message_image = '';
            if (image) {
              message_image = `<div class="message-image">
                                <img src='${image}'>
                              </div>
                              `;
            }
            const message_time = `<div class="message-time">
                                    ${data['message_time']}
                                  </div>
                                  `;
            let messageHTML = '';
            if (msg.user_id == userId) {
              messageHTML = `<div class="message-row you-message">
                              <div class="message-content">
                                ${image ? message_image : message_text}
                                ${message_time}
                              </div>
                            </div>
                            `;
            } else {
              messageHTML = `<div class="message-row other-message">
                  <div class="message-content">
                    <img src="${other_photo}" class="other-photo">
                    ${image ? message_image : message_text}
                    ${message_time}
                  </div>
                </div>
                `;
            }
            // display message in the chat-message-list
            $(
              '.chat-message-list [data-tab="chatroom_' + msg.chatroom_id + '"]'
            ).append(messageHTML);
            $('.chat-message-list').scrollTop(
              $('.chat-message-list')[0].scrollHeight
            );

            // display message in the conversation-list
            conversation.prependTo('.conversation-list');
            conversation.find('.created-date').text(data['message_time']);
            let message = '';
            if (image) {
              message = `${
                msg.user_id == userId ? 'you' : data['sender']
              } sent a image`;
            } else {
              message = msg.content;
            }
            conversation.find('.conversation-message').text(message);
            if (conversation.hasClass('active')) {
              conversation.find('div').removeClass('notice-color');
            } else {
              conversation.find('div').addClass('notice-color');
            }
          }
        }
      );
    }
  }

  App.messages = App.cable.subscriptions.create('RoomChannel', {
    received: data => {
      if (userId == data['invited_user_id']) {
        const photo = data['user_photo'];
        const room_count = $('.conversation.item').length + 1;
        let imageUrl = '';
        if (photo) {
          imageUrl = photo;
        } else {
          imageUrl = image_path('default-profile-photo.png');
        }

        const newConversation = `
          <a class="conversation item ${
            room_count == 1 ? 'active' : ''
          }" data-tab="chatroom_${data['id']}">
            <img src="${imageUrl}">
            <div class="title-text notice-color">
              ${data['username']}
              <input type="hidden" id="chatroom_idx_${room_count}"
                value="${data['id']}">
            </div>
            <div class="created-date notice-color">
              ${data['message_time']}
            </div>
            <div class="conversation-message notice-color">
              Let's talk!
            </div>
          </a>
          `;
        const messageTab = `
          <div class="ui tab ${room_count == 1 ? 'active' : ''}"
            data-tab="chatroom_${data['id']}">
          </div>
        `;
        if (room_count == 1) {
          const url = `/chatrooms/${data['id']}`;
          $('#deleteConvLink').attr('href', url);
          $('.chat-title span').text(data['username']);
          $('#message_chatroom_id').val(data['id']);
          $('#conversationMenu').css('display', 'block');
        }
        $('.conversation-list').prepend(newConversation);
        $('.chat-message-list').append(messageTab);
        subscription(room_count);
      }
    }
  });
});
