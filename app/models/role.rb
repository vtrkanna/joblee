class Role
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, :type => String
  field :role_type, :type => String
  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime

end
