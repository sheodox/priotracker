class Todo < ApplicationRecord
  validates :name, presence: true
  validates :priority, presence: true, inclusion: { in: [1, 2, 3] }
end
