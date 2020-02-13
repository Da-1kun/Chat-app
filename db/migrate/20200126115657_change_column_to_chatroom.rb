class ChangeColumnToChatroom < ActiveRecord::Migration[5.2]
  def change
    rename_column :chatrooms, :creater_id_id, :creater_id
  end
end
