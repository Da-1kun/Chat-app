class ChatroomsController < ApplicationController
  def show
    @chatrooms = Member.chatting_members(current_user.id).where.not(user_id: current_user.id)
    @users = User.where.not(
      id: [ Member.chatting_members(current_user.id).select("user_id")]
      )
    @message = Message.new
    @chatroom = Chatroom.new
  end

  def create
    @chatroom = Chatroom.new(creater_id: current_user.id)
    if @chatroom.save
      Member.create(chatroom_id: @chatroom.id, user_id: current_user.id)
      Member.create(chatroom_id: @chatroom.id, user_id: params[:chatroom][:user_id])
    end
    redirect_to chatroom_path
  end

  private
  def chatroom_params
    params.require(:chatroom).permit(:user_id)
  end
end
