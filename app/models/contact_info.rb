class ContactInfo
  include Mongoid::Document

  field :subscriber_contact, :type => Boolean
  field :primary_contact, :type => Boolean
  field :work_contact, :type => Boolean
  field :contact_status
  field :contact_type
  field :email_id, :type => Integer
  field :contact_number_id, :type => Integer
  field :fax
  field :location_id, :type => Integer
  field :work_type
  field :work_fax
  field :designation
  field :url_id, :type => Integer
  field :social_hub_id, :type => Integer
  field :address_id, :type => Integer
  field :created_by
  field :updated_by
  field :created_at, :type => DateTime
  field :updated_at, :type => DateTime

end
