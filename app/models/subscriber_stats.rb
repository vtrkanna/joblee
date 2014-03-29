class SubscriberStats
  include Mongoid::Document

  field :subscriber_id, :type => Integer
  field :subscriber_control_id, :type => Integer
  field :created_by
  field :updated_by
  field :craeted_at, :type => DateTime
  field :updated_at, :type => DateTime

end
