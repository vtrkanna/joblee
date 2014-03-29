class Subscriber
  include Mongoid::Document

  field :name_id, :type => Integer
  field :title, :type => String
  field :address_id, :type => Integer
  field :status_id, :type => Integer
  field :subscriber_type, :type => String
  field :email_id, :type => Integer
  field :password_id, :type => Integer
  field :email, :type => String
  field :active, :type => Boolean
  field :subscription_id, :type => Integer
  field :alerts, :type => Integer
  field :subscriber_other_detail_id, :type => Integer
  field :subscriber_control_id, :type => Integer
  field :remember_me_time, :type => DateTime
  field :last_login, :type => DateTime
  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime
end
