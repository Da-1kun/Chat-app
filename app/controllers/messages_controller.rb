class MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    message.user = current_user
    chatroom = Chatroom.find_by(id: message.chatroom_id)
    return redirect_to chatroom_path if chatroom.nil?

    if message.save!
      chatroom.update(last_message_id: message.id)
      ActionCable.server.broadcast "chatroom_#{message.chatroom_id}",
        message: message, message_time: format_time(message.created_at), 
        sender: current_user.username
      head :ok
    else 
      redirect_to chatroom_path
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :chatroom_id, :image)
  end
end