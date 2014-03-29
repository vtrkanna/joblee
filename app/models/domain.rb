class Domain
  include Mongoid::Document

  field :url, :type => String
  field :url_type, :type => String
  field :active, :type => Boolean
  field :old, :type => Boolean
  field :version, :type => Integer
  field :site_id
  field :created_by
  field :updated_by
  field :created_at
  field :updated_at

end
