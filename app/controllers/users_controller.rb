class UsersController < ApplicationController
  before_action :require_user, except: [:new, :create]
  before_action :set_user, only: [:update, :destroy]
  before_action :require_same_user, only: [:update, :destroy]

  def index
    @users = User.where.not(
      id: [ Member.chatting_members(current_user.id).select("user_id")]
    ).where.not(id: current_user.id)
    @chatroom = Chatroom.new
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to chatrooms_path
    else
      render 'new'
    end
  end

  def update
    if @user.update(user_params)
      flash[:success] = "Your profile was successfully updated"
      redirect_to chatrooms_path
    else
      @user
    end
  end

  def destroy
    chatrooms = Chatroom.where(id: Member.where(user_id: @user.id).select("chatroom_id"))
    chatrooms.each do |chatroom|
      chatroom.destroy
    end
    @user.destroy
    session[:user_id] = nil
    redirect_to root_path
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :photo)
  end

  def set_user
    @user = User.find(params[:id])
  end

  def require_same_user
    if current_user != @user and !current_user.admin?
      flash[:error] = "You can only edit or delete your own account"
      redirect_to root_path
    end
  end
end