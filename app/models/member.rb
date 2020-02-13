class Member < ApplicationRecord
  belongs_to :chatroom
  belongs_to :user

  scope :chatting_members, -> (user_id){ 
    where(
      chatroom_id: Member.where(user_id: user_id).select("chatroom_id")
    ).where.not(user_id: user_id)}
end
