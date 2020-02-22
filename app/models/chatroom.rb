class Chatroom < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :members, dependent: :destroy
  belongs_to :creater, class_name: "User"

end
