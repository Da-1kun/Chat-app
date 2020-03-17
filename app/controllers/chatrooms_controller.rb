class ChatroomsController < ApplicationController
  before_action :require_user
  before_action :require_member, only: [:destroy]

  def index
    @chatrooms = Member.conversations.where(
      chatroom_id: Member.where(user_id: current_user.id).select("chatroom_id")
    ).where.not(user_id: current_user.id).order(room_updated_at: "DESC")
    @message = Message.new
    byebug
    @user = current_user
    byebug
  end

  def create
    @chatroom = Chatroom.new(creater_id: current_user.id)
    if @chatroom.save
      Member.create(chatroom_id: @chatroom.id, user_id: current_user.id)
      Member.create(chatroom_id: @chatroom.id, user_id: params[:chatroom][:user_id])
      RoomManagerJob.perform_later(@chatroom.id, format_time(@chatroom.created_at),
       params[:chatroom][:user_id], current_user)
    end
    redirect_to chatrooms_path
  end

  def destroy
    chatroom = Chatroom.find(params[:id])
    chatroom.destroy
    redirect_to chatrooms_path
  end

  private
  def chatroom_params
    params.require(:chatroom).permit(:user_id)
  end

  def require_member
    member = Member.find_by(user_id: current_user.id, chatroom_id: params[:id])
    unless !!member
      flash[:error] = "You can only delete your conversation"
      redirect_to root_path
    end
  end
end
