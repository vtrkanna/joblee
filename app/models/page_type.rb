class PageType
  include Mongoid::Document

  field :name
  field :site_id
  field :created_by
  field :updated_by
  field :created_at
  field :updated_at
end
