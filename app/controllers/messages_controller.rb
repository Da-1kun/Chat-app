class MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    message.user = current_user
    # byebug
    if message.save!
      ActionCable.server.broadcast 'messages',
        message: message
      head :ok
    else 
      redirect_to chatroom_path
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :chatroom_id)
  end
end