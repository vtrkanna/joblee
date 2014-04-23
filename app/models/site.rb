class Site
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, :type => String
  field :alt_name, :type => String
  field :domain_id, :type => Integer
  field :active, :type => Boolean
  field :status_id, :type => Integer
  field :tag_id, :type => Integer
  field :layout, :type => String
  field :template_id, :type => Integer
  field :created_by, :type => Integer
  field :updated_by, :type => Integer
  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime
  #field :page_id, :type => Integer

  validate :name, :domain_id, :layout, :active, :presence => true

  embeds_many :pages

end
