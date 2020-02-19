class Message < ApplicationRecord
  belongs_to :chatroom
  belongs_to :user

  scope :latest_message, -> (chatroom_id){
    where(chatroom_id: chatroom_id).order(created_at: "DESC").first
  }
  scope :new_messages, -> (chatroom_id){
    where(chatroom_id: chatroom_id).limit(30)
  }
end