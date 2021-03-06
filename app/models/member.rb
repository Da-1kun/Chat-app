class Member < ApplicationRecord
  belongs_to :chatroom
  belongs_to :user

  scope :conversations, -> {
    joins("LEFT JOIN chatrooms ON members.chatroom_id = chatrooms.id")
      .joins("LEFT JOIN messages ON chatrooms.last_message_id = messages.id")
      .preload(:user)
      .select(" members.user_id,
                chatrooms.id,
                chatrooms.updated_at AS room_updated_at,
                messages.user_id AS message_user_id,
                messages.content,
                messages.created_at AS msg_created_at,
                messages.image")
  }

  scope :chatting_members, -> (user_id){ 
    where(
      chatroom_id: Member.where(user_id: user_id).select("chatroom_id")
    )
  }
end
