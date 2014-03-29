class SubscriberControl
  include Mongoid::Document

  field :start_date, :type => DateTime
  field :end_date, :type => DateTime
  field :subscriber_id, :type => Integer
  field :site_id, :type => Integer
  field :subscriber_type_id, :type => Integer
  field :subscriber_other_detail_id, :type => Integer
  field :subscriber_log, :type => Integer
  field :active_location, :type => String
  field :created_by, :type => Integer
  field :updated_by, :type => Integer
  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime
  field :session_id, :type => Integer
  field :subscriber_stats_id, :type => Integer

end
