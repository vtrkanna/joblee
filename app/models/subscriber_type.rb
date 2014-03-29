class SubscriberType
  include Mongoid::Document

  field :name, :type => String
  field :site_id, :type => Integer
  field :created_by
  field :updated_by
  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime
end
