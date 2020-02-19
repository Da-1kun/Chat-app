$(document).on('turbolinks:load', () => {
  const room_count = $('.conversation.item').length;
  for (let i = 1; i <= room_count; i++) {
    App.messages = App.cable.subscriptions.create(
      {channel: 'MessagesChannel', room: $('#chatroom_idx_' + i).val()}, {
        received: data => {
          const msg = data['message'];
          const userId = $('#currentUserId').val();
          let messageHTML = '';
          if (msg.user_id == userId) {
            messageHTML =
              `<div class="message-row you-message">
                  <div class="message-content">
                    <div class="message-text">
                      ${msg.content}
                    </div>
                    <div class="message-time">
                      ${data['created_at']}
                    </div>
                  </div>
                </div>
              `;
          } else {
            messageHTML =
              `<div class="message-row other-message">
                <div class="message-content">
                  <img src="/assets/default-profile-photo.png">
                  <div class="message-text">
                    ${msg.content}
                  </div>
                  <div class="message-time">
                    ${data['created_at']}
                  </div>
                </div>
              </div>
              `;
          }
          // display message in the chat-message-list
          $('.chat-message-list [data-tab="chatroom_' + msg.chatroom_id + '"]').append(messageHTML);
          $('.chat-message-list').scrollTop($('.chat-message-list')[0].scrollHeight)

          // display message in the conversation-list
          const conversation = $('.conversation-list [data-tab="chatroom_' + msg.chatroom_id + '"]');
          conversation.prependTo('.conversation-list');
          conversation.find('.created-date').text(data['created_at']);
          conversation.find('.conversation-message').text(msg.content);
          if (!conversation.hasClass('active')) {
            conversation.find('div').addClass('notice-color');
          }
      }
    });
  };
});