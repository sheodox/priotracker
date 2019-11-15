class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.integer :priority
      t.string :name
      t.text :description
      t.boolean :visible

      t.timestamps
    end
  end
end
