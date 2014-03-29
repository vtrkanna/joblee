class Page
  include Mongoid::Document

  field :name, :type => String
  field :title, :type => String
  field :parent_id, :type => Integer
  field :status_id, :type => Integer
  field :template_id, :type => Integer
  field :theme_id, :type => Integer
  field :site_id, :type => Integer
  field :page_type_id, :type => Integer
  field :active, :type => Boolean
  field :domain_id, :type => Integer
  field :layout, :type => String
  field :layout_required, :type => Boolean
  field :menu_id, :type => Integer
  field :tag_id, :type => Integer
  field :published, :type => Date
  field :expiry_date, :type => DateTime
  field :created_by, :type => Integer
  field :updated_by, :type => Integer
  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime

end
