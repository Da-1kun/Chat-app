$(document).on('turbolinks:load', () => {
  if ($('#currentUserId').length) {
    App.messages = App.cable.subscriptions.create('AppearanceChannel', {
      received: data => {
        const selector = `#chat-user-${data['user_id']}`;
        if ($(selector).length) {
          if (data['online']) {
            $(selector).addClass('online-color');
          } else {
            $(selector).removeClass('online-color');
          }
        }
      }
    });
  }
});
