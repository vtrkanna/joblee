class SubscriberOtherDetail
  include Mongoid::Document

  field :subscriber_id, :type => Integer
  field :subscriber_control_id, :type => Integer
  field :address_id, :type => Integer
  field :email_id, :type => Integer
  field :contact_info_id, :type => Integer
  field :contact_number_id, :type => Integer
  field :sikls_id, :type => Integer
  field :qualification_id, :type => Integer
  field :about_me
  field :subscriber_profile_id, :type => Integer
  field :image_id

end
