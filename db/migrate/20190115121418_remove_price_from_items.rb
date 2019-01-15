class RemovePriceFromItems < ActiveRecord::Migration[5.2]
  def up
    remove_column :items, :price, :integer
  end

  def down
    add_column :items, :price, :integer
  end
end
