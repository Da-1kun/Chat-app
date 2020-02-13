class RemoveUserFromMessage < ActiveRecord::Migration[5.2]
  def up
    remove_column :messages, :user, :integer
  end

  def down
    add_column :messages, :user, :integer
  end
end
