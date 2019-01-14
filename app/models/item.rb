class Item < ApplicationRecord
  has_many_attached :images
  validates :name, :price, :description ,presence: true
end
