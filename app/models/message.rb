class Message < ApplicationRecord
  mount_uploader :image, ImageUploader
  
  belongs_to :chatroom
  belongs_to :user

  scope :recent_messages, -> (chatroom_id){
    where(chatroom_id: chatroom_id).order(:created_at).last(30)
  }
end
