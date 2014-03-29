class Password
  include Mongoid::Document

  field :new, :type => String
  field :hint, :type => String
  field :password_type, :type => String
  field :old, :type => Boolean
  field :active, :type => Boolean
  field :version, :type => Integer
  field :reset_password_code, :type => String
  field :created_by, :type => Integer
  field :updated_by, :type => Integer
  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime
end
