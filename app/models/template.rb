class Template
  include Mongoid::Document

  field :name
  field :path
  field :site_id
  field :template_type
  field :created_by
  field :updated_by
  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime

end
