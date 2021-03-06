class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id
      flash[:success] = "You have successfully logged in"
      cookies.encrypted[:user_id] = user.id
      redirect_to chatrooms_path
    else
      flash.now[:error] = "There was something wrong with your login infomation"
      render 'new'
    end
  end

  def destroy
    session[:user_id] = nil
    cookies.encrypted[:user_id] = nil
    flash[:success] = "You have successfully loged out"
    redirect_to root_path
  end
end