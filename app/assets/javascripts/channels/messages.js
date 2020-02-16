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
          $('.chat-message-list [data-tab="chatroom_' + msg.chatroom_id + '"]').append(messageHTML);
      }
    });
  }
});