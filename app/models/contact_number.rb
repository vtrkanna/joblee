class ContactNumber
  include Mongoid::Document

  field :telephone
  field :primary_mb_no
  field :alternate_mb_no
  field :home_no
  field :home, :type => Boolean
  field :work_telephone
  field :work_mb_no
  field :office_no
  field :other
  field :active, :type => Boolean
  field :work, :type => Boolean
  field :version, :type => Integer
  field :subscriber_contact, :type => Boolean
  field :site_id, :type => Integer
  field :created_by
  field :updated_by

end
