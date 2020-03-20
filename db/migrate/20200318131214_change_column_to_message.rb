class ChangeColumnToMessage < ActiveRecord::Migration[5.2]
  def up
    change_column :messages, :content, :text
  end

  def down
    change_column :messages, :content, :string
  end
end
