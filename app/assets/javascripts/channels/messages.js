$(document).on('turbolinks:load', () => {
  const room_count = $('.conversation.item').length;
  for (let i = 1; i <= room_count; i++) {
    App.messages = App.cable.subscriptions.create(
      { channel: 'MessagesChannel', room: $('#chatroom_idx_' + i).val() },
      {
        received: data => {
          const msg = data['message'];
          const userId = $('#currentUserId').val();
          const image = msg.image.url;
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
                  <img src="/assets/default-profile-photo-05b4c332df80f3f4d05569864064136a39397701a270a67f25b3d27061cbd897.png"
                   class="other-photo">
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
          const conversation = $(
            '.conversation-list [data-tab="chatroom_' + msg.chatroom_id + '"]'
          );
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
          if (!conversation.hasClass('active')) {
            conversation.find('div').addClass('notice-color');
          }
        }
      }
    );
  }
});
