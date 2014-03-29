class Subscriber
  include Mongoid::Document

  field :name_id, :type => Integer
  field :title, :type => String
  field :status_id, :type => Integer
  field :subscriber_type_id, :type => Integer
  field :password_id, :type => Integer
  field :active, :type => Boolean
  field :subscription_id, :type => Integer
  field :alert_id, :type => Integer
  field :subscriber_other_detail_id, :type => Integer
  field :subscriber_control_id, :type => Integer
  field :role_id, :type => Integer
  field :remember_me_time, :type => DateTime
  field :last_login, :type => DateTime
  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime
end
