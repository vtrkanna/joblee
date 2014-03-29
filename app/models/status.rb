class Status
  include Mongoid::Document

  field :name, :type => String
  field :status_type, :type => String
  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime

end
