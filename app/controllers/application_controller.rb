class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?, :any_message? ,:get_created_at, :get_content
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !!current_user
  end

  def require_user
    if !logged_in?
      flash[:error] = "You must be logged in to perform that action"
      redirect_to root_path
    end
  end

  def any_message?(chatroom_id)
    Message.where(chatroom_id: chatroom_id).any?
  end

  def get_created_at(chatroom_id)
    Message.latest_message(chatroom_id).created_at.strftime('%Y/%m/%d')
  end

  def get_content(chatroom_id)
    Message.latest_message(chatroom_id).content
  end
end
