class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chatroom_#{params['room']}"
  end
end