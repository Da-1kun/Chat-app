class User < ApplicationRecord

  mount_uploader :photo, PhotoUploader

  has_secure_password
  has_many :messages, dependent: :destroy
  has_many :members, dependent: :destroy
  has_many :chatrooms

  validates :username, presence: true, uniqueness: { case_sensitive: false },
                        length: { minimum: 3, maximum: 15 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: { case_sensitive: false },
                      length: { maximum: 50},
                      format: { with: VALID_EMAIL_REGEX }
  
  def online?
    !Redis.new.get("user_#{self.id}_online").nil?
  end
end
