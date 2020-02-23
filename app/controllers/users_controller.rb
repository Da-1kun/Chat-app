class UsersController < ApplicationController
  def index
    @users = User.where.not(
      id: [ Member.chatting_members(current_user.id).select("user_id")]
      )
    @chatroom = Chatroom.new
  end
end