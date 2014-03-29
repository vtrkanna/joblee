class Address
  include Mongoid::Document

  field :address_1, :type => String
  field :address_2, :type => String
  field :address_3, :type => String
  field :address_4, :type => String
  field :city_id, :type => Integer
  field :state_id, :type => Integer
  field :country_id, :type => Integer
  field :post_code, :type => String
  field :active, :type => Boolean
  field :expired, :type => Boolean
  field :version, :type => Integer
  field :address_type, :type => String
  field :full_address, :type => String


end
