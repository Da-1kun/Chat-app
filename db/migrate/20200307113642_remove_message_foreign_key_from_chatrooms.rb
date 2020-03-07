class RemoveMessageForeignKeyFromChatrooms < ActiveRecord::Migration[5.2]
  def change
    remove_foreign_key :chatrooms, :messages
  end
end
