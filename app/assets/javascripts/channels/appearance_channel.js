$(document).on('turbolinks:load', () => {
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
});
