class AddRefToChatroom < ActiveRecord::Migration[5.2]
  def change
    add_reference :chatrooms, :last_message, foreign_key: { to_table: :messages }  
  end
end
