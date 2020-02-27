class UsersController < ApplicationController
  def index
    @users = User.where.not(
      id: [ Member.chatting_members(current_user.id).select("user_id")]
      )
    @chatroom = Chatroom.new
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to chatroom_path
    else
      render 'new'
    end
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      redirect_to chatroom_path
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :photo)
  end
end