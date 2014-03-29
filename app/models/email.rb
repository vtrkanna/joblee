class Email
  include Mongoid::Document

  field :primary_mail, :type => String
  field :alternate_mail, :type => String
  field :delivery_mail, :type => String
  field :work_mail, :type => String
  field :email_type
  field :subscriber_mail, :type => Boolean
  field :subscriber_id, :type => Integer
  field :active, :type => Boolean
  field :old, :type => Boolean
  field :version, :type => Integer
  field :created_by
  field :updated_by
  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime
end
