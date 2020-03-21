$(document).on('turbolinks:load', () => {
  if ($('#currentUserId').length) {
    const height = window.innerHeight + 'px';
    $('.chat-container').css('height', height);

    let timeoutId;
    window.addEventListener('resize', () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        $('.chat-container').css('height', height);
      }, 500);
    });

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
