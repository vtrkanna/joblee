class Menu
  include Mongoid::Document

  field :name, :type => String
  field :title, :type => String
  field :status_id, :type => Integer
  field :parent_id, :type => Integer
  field :sequence_order, :type => Integer
  field :url_id, :type => Integer
  field :page_id, :type => Integer
  field :site_id, :type => Integer
  field :active, :type => Boolean
  field :menu_type, :type => String
  field :tag_id, :type => Integer
  field :source_id, :type => Integer
  field :created_by, :type => Integer
  field :updated_by, :type => Integer
  field :created_at, :type => Integer
  field :updated_at, :type => Integer
end
