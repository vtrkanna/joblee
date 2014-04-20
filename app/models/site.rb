class Site
  include Mongoid::Document

  field :name, :type => String
  field :alt_name, :type => String
  field :domain_id, :type => Integer
  field :active, :type => Boolean
  field :page_id, :type => Integer
  field :status_id, :type => Integer
  field :tag_id, :type => Integer
  field :layout, :type => String
  field :template_id, :type => Integer
  field :created_by, :type => Integer
  field :updated_by, :type => Integer
  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime

  #embeds_many :albums
  has_many :pages
  scope :active, where(:active => true)

end
