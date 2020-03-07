class ChangeCloumnToChatroom < ActiveRecord::Migration[5.2]
  def change
    if foreign_key_exists?(:chatrooms, :last_message_id)
      remove_foreign_key :chatrooms, :last_message_id
    end
  end
end
