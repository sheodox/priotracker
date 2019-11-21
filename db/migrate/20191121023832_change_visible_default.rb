class ChangeVisibleDefault < ActiveRecord::Migration[6.0]
  def change
    change_column :todos, :visible, :boolean, default: true
  end
end
