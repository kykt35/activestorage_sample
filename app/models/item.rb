class Item < ApplicationRecord
  has_many_attached :images
  validates :name, :description ,presence: true
end
