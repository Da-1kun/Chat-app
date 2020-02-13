class MessagesChannel < ApplicationCable::Channel
  def subscribud
    stream_from 'messages'
  end
end