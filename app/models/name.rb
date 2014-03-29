class Name
  include Mongoid::Document

  field :first_name, :type => String
  field :last_name, :type => String
  field :alternate_name, :type => String
  field :display_name, :type => String
  field :user_name, :type => String
  field :name_type, :type => String
  field :status_id, :type => Integer
  field :active, :type => Boolean
  field :subscriber_name, :type => Boolean
  field :other_type_name, :type => Boolean
  field :subscriber_id, :type => Integer
  field :old, :type => Boolean
  field :version, :type => Integer
  field :created_by, :type => Integer
  field :updated_by, :type => Integer
  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime

end
