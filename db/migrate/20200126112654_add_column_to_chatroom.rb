class AddColumnToChatroom < ActiveRecord::Migration[5.2]
  def change
    add_reference :chatrooms, :creater_id, foreign_key: { to_table: :users }
  end
end
