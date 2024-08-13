class Post < ApplicationRecord
    validates :title, :description, :published_at, presence: true
end
