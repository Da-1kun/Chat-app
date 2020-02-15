$(document).on('turbolinks:load', () => {
  const room_count = $('.conversation.item').length;
  for (let i = 1; i < room_count + 1; i++) {
    App.messages = App.cable.subscriptions.create(
      {channel: 'MessagesChannel', room: $('#chatroom_idx_' + i).val()}, {
        received: function(data) {
          console.table(data['message']);
          const msg = data['message'];
          $('[data-tab="' + msg.chatroom_id + '"]').append();
      }
    });
  }
});