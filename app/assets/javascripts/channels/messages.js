App.messages = App.cable.subscriptions.create('MessagesChannel', {
  received: function(data) {
    
  }
});