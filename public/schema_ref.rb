# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140211055654) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "addresses", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "address_1"
    t.string   "address_2"
    t.string   "address_3"
    t.string   "address_4"
    t.string   "address_5"
    t.uuid     "city_id"
    t.uuid     "country_id"
    t.uuid     "state_id"
    t.uuid     "region_id"
    t.string   "post_code"
    t.string   "full_address"
    t.boolean  "old"
    t.boolean  "active"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "addresses", ["id", "full_address"], name: "index_full_address", using: :btree

  create_table "agents", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "name_id"
    t.uuid     "address_id"
    t.uuid     "content_id"
    t.uuid     "contact_number_id"
    t.string   "area_ids"
    t.uuid     "office_id"
    t.string   "remember_me"
    t.string   "session_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "agents", ["id", "name_id", "address_id", "content_id", "contact_number_id", "office_id", "area_ids"], name: "index_agents", using: :btree

  create_table "area_events", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.uuid     "area_id"
    t.string   "display_name"
    t.datetime "publish_date"
    t.datetime "expiry_date"
    t.boolean  "active"
    t.boolean  "expired"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "area_other_infos", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.time     "open_time"
    t.time     "close_time"
    t.string   "no_of_products"
    t.uuid     "no_of_staffs"
    t.uuid     "note_id"
    t.datetime "area_stated_time"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "area_other_infos", ["id", "open_time", "close_time", "note_id"], name: "index_area_other_infos", using: :btree

  create_table "area_subscribers", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "area_id"
    t.uuid     "area_review_id"
    t.string   "no_subscribers"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "area_subscribers", ["id", "area_id", "no_subscribers"], name: "index_area_subscribers", using: :btree

  create_table "areas", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "name_id"
    t.uuid     "password_id"
    t.uuid     "email_id"
    t.uuid     "contact_number_id"
    t.uuid     "contact_info_id"
    t.string   "fax"
    t.string   "website"
    t.text     "description"
    t.uuid     "content_id"
    t.string   "overview"
    t.uuid     "agent_id"
    t.uuid     "main_office_id"
    t.uuid     "office_id"
    t.uuid     "area_review_id"
    t.uuid     "area_event_id"
    t.uuid     "area_other_info_id"
    t.uuid     "social_hub_id"
    t.string   "remember_me"
    t.string   "session_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "areas", ["id", "name_id", "password_id", "email_id", "main_office_id", "office_id", "content_id"], name: "index_areas", using: :btree

  create_table "audios", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.string   "title"
    t.string   "author"
    t.boolean  "licence"
    t.string   "licence_type"
    t.string   "licence_key"
    t.text     "description"
    t.string   "audio_path"
    t.string   "audio_type"
    t.uuid     "status_id"
    t.uuid     "image_id"
    t.uuid     "file_size"
    t.string   "file_name"
    t.string   "caption"
    t.boolean  "avatar"
    t.uuid     "avatar_id"
    t.uuid     "version_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "avatars", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.string   "type"
    t.uuid     "image_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "banners", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.uuid     "image_id"
    t.uuid     "page_id"
    t.uuid     "site_id"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "blocks", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "sequence_order"
    t.uuid     "page_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "booked_products", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "subscriber_id"
    t.uuid     "product_id"
    t.uuid     "area_id"
    t.uuid     "subscriber_bucket_id"
    t.uuid     "agent_id"
    t.time     "time"
    t.uuid     "quantity"
    t.uuid     "booking_status_id"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "booked_products", ["id", "product_id", "subscriber_id", "area_id", "subscriber_bucket_id", "agent_id", "time", "booking_status_id"], name: "index_booked_products", using: :btree

  create_table "booked_statuses", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "booking_statuses", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.datetime "created_by"
    t.datetime "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "breadcrumbs", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.string   "title"
    t.uuid     "page_id"
    t.uuid     "url_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "categories", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.string   "title"
    t.string   "category_type"
    t.uuid     "site_id"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "cities", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.uuid     "country_id"
    t.uuid     "region_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "cities", ["id", "name", "country_id", "region_id"], name: "index_cities", using: :btree

  create_table "contact_infos", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.boolean  "subscriber_contact"
    t.boolean  "primary_contact"
    t.boolean  "work_contact"
    t.boolean  "area_contact"
    t.boolean  "agent_contact"
    t.string   "contact_status"
    t.string   "contact_type"
    t.uuid     "email_id"
    t.uuid     "contact_number_id"
    t.string   "fax"
    t.string   "work_location"
    t.string   "work_type"
    t.string   "work_fax"
    t.text     "designation"
    t.string   "work_website"
    t.uuid     "social_hub_id"
    t.uuid     "address_id"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "contact_infos", ["id"], name: "index_contact_infos", using: :btree

  create_table "contact_numbers", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "telephone"
    t.string   "primary_mb_no"
    t.string   "alternate_mb_no"
    t.string   "home_no"
    t.boolean  "home"
    t.string   "work_telephone"
    t.string   "work_mb_no"
    t.string   "office_no"
    t.string   "other"
    t.boolean  "active"
    t.boolean  "work"
    t.datetime "created_at"
    t.datetime "update_at"
    t.datetime "updated_at"
  end

  add_index "contact_numbers", ["id"], name: "index_contact_numers", using: :btree

  create_table "contents", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "title"
    t.string   "sub_title"
    t.uuid     "version_id"
    t.text     "description"
    t.text     "text"
    t.boolean  "note"
    t.boolean  "info"
    t.string   "type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "contents", ["id", "title", "version_id", "text", "description", "note", "info", "type"], name: "index_contents", using: :btree

  create_table "countries", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.uuid     "region_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "countries", ["id", "name", "region_id"], name: "index_countries", using: :btree

  create_table "departments", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.string   "title"
    t.string   "category_type"
    t.uuid     "site_id"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "effects", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "emails", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "primary_mail"
    t.string   "alternate_mail"
    t.string   "delivery_mail"
    t.string   "work_mail"
    t.uuid     "version_id"
    t.boolean  "subscriber"
    t.uuid     "subscriber_id"
    t.boolean  "agent"
    t.uuid     "agent_id"
    t.boolean  "area"
    t.boolean  "area_id"
    t.boolean  "active"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "emails", ["id"], name: "index_emails", using: :btree

  create_table "free_subscribers", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "subscriber_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "free_subscribers", ["id", "subscriber_id"], name: "index_free_subscribers", using: :btree

  create_table "groups", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "update_at"
    t.datetime "updated_at"
  end

  create_table "images", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.string   "title"
    t.text     "description"
    t.string   "author"
    t.string   "atl_tag"
    t.boolean  "licence"
    t.string   "licence_type"
    t.string   "licence_key"
    t.boolean  "avatar"
    t.uuid     "avatar_id"
    t.string   "image_type"
    t.uuid     "sequence_number"
    t.uuid     "width"
    t.uuid     "height"
    t.string   "resolution"
    t.string   "file_size"
    t.uuid     "gallery_id"
    t.string   "image_path"
    t.string   "image_source"
    t.uuid     "status_id"
    t.uuid     "version_id"
    t.string   "caption"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "industry_types", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "infos", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "content_id"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "invoice_details", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "product_id"
    t.uuid     "area_id"
    t.date     "date"
    t.float    "amount"
    t.float    "discount"
    t.date     "invoice_date"
    t.uuid     "invoice_number"
    t.uuid     "service_charge"
    t.uuid     "service_tax_amount"
    t.uuid     "service_tax_percentage"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "invoice_details", ["id", "product_id", "area_id", "amount", "discount", "invoice_date", "invoice_number", "invoice_number", "service_charge", "service_tax_amount", "service_tax_percentage"], name: "index_invoice_details", using: :btree

  create_table "layouts", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.string   "path"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "medias", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "video_info_id"
    t.uuid     "image_id"
    t.uuid     "product_id"
    t.uuid     "area_id"
    t.uuid     "agent_id"
    t.uuid     "audio_id"
    t.uuid     "site_id"
    t.uuid     "page_id"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "medias", ["id", "video_info_id", "image_id", "product_id", "area_id", "agent_id", "audio_id", "site_id", "page_id"], name: "index_medias", using: :btree

  create_table "menus", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.string   "title"
    t.uuid     "status_id"
    t.uuid     "url_id"
    t.uuid     "parent_id"
    t.uuid     "position"
    t.uuid     "page_id"
    t.uuid     "site_id"
    t.uuid     "page_type_id"
    t.boolean  "active"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "names", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "full_name"
    t.string   "alternate_name"
    t.string   "nick_name"
    t.string   "user_name"
    t.string   "display_name"
    t.uuid     "last_used"
    t.boolean  "subscriber"
    t.boolean  "other"
    t.uuid     "status_id"
    t.string   "type"
    t.uuid     "subscriber_id"
    t.boolean  "active"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "names", ["id", "full_name", "user_name", "status_id"], name: "index_names", using: :btree

  create_table "notes", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "content_id"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "offices", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.string   "alternate_name"
    t.uuid     "address_id"
    t.uuid     "contact_number_id"
    t.boolean  "main_office"
    t.uuid     "version_id"
    t.uuid     "active"
    t.uuid     "sequence_order"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "offices", ["id", "name", "main_office", "active", "address_id", "contact_number_id"], name: "index_offices", using: :btree

  create_table "packages", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "page_types", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "pages", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.uuid     "parent_id"
    t.uuid     "status_id"
    t.uuid     "template_id"
    t.uuid     "theme_id"
    t.uuid     "site_id"
    t.uuid     "page_type_id"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.date     "published"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "pages", ["name", "parent_id", "status_id", "site_id", "page_type_id", "template_id", "theme_id", "published"], name: "index_pages", using: :btree

  create_table "passwords", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "new"
    t.boolean  "old"
    t.uuid     "old_id"
    t.uuid     "subscriber_id"
    t.boolean  "active"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "passwords", ["id", "new"], name: "index_passwords", using: :btree

  create_table "premium_subscribers", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "subscriber_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "premium_subscribers", ["id", "subscriber_id"], name: "index_premium_subscribers", using: :btree

  create_table "product_categories", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.string   "title"
    t.string   "category_type"
    t.uuid     "site_id"
    t.uuid     "product_id"
    t.uuid     "page_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "product_categories", ["id", "name", "title", "category_type", "site_id", "product_id"], name: "index_product_categories", using: :btree

  create_table "product_in_pages", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "sequence_order"
    t.uuid     "page_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "product_infos", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "product_id"
    t.uuid     "product_type_id"
    t.uuid     "video"
    t.uuid     "booking_status_id"
    t.uuid     "invoice_detail_id"
    t.uuid     "info_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "product_infos", ["id", "product_id", "product_type_id", "video", "booking_status_id", "invoice_detail_id", "info_id"], name: "index_product_infos", using: :btree

  create_table "product_statuses", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "product_types", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "update_at"
    t.datetime "updated_at"
  end

  create_table "products", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "name_id"
    t.string   "title"
    t.string   "key_word"
    t.text     "description"
    t.uuid     "image_id"
    t.uuid     "product_status_id"
    t.uuid     "product_info_id"
    t.boolean  "expired"
    t.boolean  "area_event"
    t.boolean  "active"
    t.uuid     "group_id"
    t.uuid     "product_type_id"
    t.uuid     "agent_id"
    t.uuid     "area_id"
    t.uuid     "area_event_id"
    t.uuid     "content_id"
    t.uuid     "invoice_detail_id"
    t.datetime "publish_date"
    t.datetime "expiry_date"
    t.string   "tag"
    t.uuid     "version_id"
    t.datetime "created_at"
    t.datetime "update_at"
    t.datetime "updated_at"
  end

  add_index "products", ["id", "name_id", "product_status_id", "product_info_id", "active", "expired", "title", "group_id", "product_type_id", "invoice_detail_id", "content_id", "tag", "version_id"], name: "index_products", using: :btree

  create_table "regions", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "regions", ["id", "name"], name: "index_regions", using: :btree

  create_table "reviews", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "rank"
    t.uuid     "subscriber_id"
    t.string   "format"
    t.boolean  "helpful"
    t.uuid     "helpful_rate"
    t.boolean  "area"
    t.uuid     "area_id"
    t.boolean  "product"
    t.uuid     "product_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "roles", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.uuid     "status_id"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.uuid     "subscriber_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sites", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.uuid     "url_id"
    t.boolean  "active"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sites", ["id", "name", "url_id", "active"], name: "index_sites", using: :btree

  create_table "social_hubs", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "facebook"
    t.string   "google_plus"
    t.string   "twitter"
    t.string   "youtube"
    t.string   "blogger"
    t.string   "wordpress"
    t.datetime "created_at"
    t.datetime "update_at"
    t.datetime "updated_at"
  end

  create_table "statuses", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "statuses", ["id", "name"], name: "index_statuses", using: :btree

  create_table "subscriber_buckets", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.uuid     "subscriber_id"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "subscriber_buckets", ["id", "name", "subscriber_id"], name: "index_subscriber_buckets", using: :btree

  create_table "subscriber_budgets", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "subscriber_id"
    t.uuid     "min_budget"
    t.uuid     "max_budget"
    t.uuid     "version_id"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.uuid     "subscriber_into_product_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "subscriber_budgets", ["id", "subscriber_id", "min_budget", "max_budget", "subscriber_into_product_id"], name: "index_subscriber_budgets", using: :btree

  create_table "subscriber_into_products", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "subscriber_id"
    t.uuid     "subscriber_bucket_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "subscriber_into_products", ["id", "subscriber_id", "subscriber_bucket_id"], name: "index_subscriber_into_products", using: :btree

  create_table "subscriber_types", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "subscriber_viewed_products", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "subscriber_id"
    t.uuid     "product_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "subscriber_viewed_products", ["id", "subscriber_id", "product_id"], name: "index_subscriber_viewed_products", using: :btree

  create_table "subscribers", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email_id"
    t.string   "alternate_mail_id"
    t.date     "date_of_birth"
    t.integer  "password_id"
    t.string   "address_1"
    t.string   "address_2"
    t.integer  "city_id"
    t.integer  "state_id"
    t.integer  "country_id"
    t.string   "post_code"
    t.string   "mobile_no"
    t.string   "subscriber_type_id"
    t.integer  "free_subscriber_id"
    t.integer  "user_name_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "templates", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.uuid     "site_id"
    t.uuid     "theme_id"
    t.uuid     "status_id"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "terms_and_conditions", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.uuid     "site_id"
    t.boolean  "page"
    t.uuid     "page_id"
    t.uuid     "content_id"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "themes", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.uuid     "template_id"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "urls", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.string   "type"
    t.boolean  "active"
    t.integer  "site_id"
    t.integer  "page_id"
    t.integer  "created_by"
    t.integer  "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "urls", ["name", "type", "active"], name: "index_urls", using: :btree

  create_table "users", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.uuid     "name_id"
    t.uuid     "address_id"
    t.uuid     "subscriber_id"
    t.uuid     "note_id"
    t.uuid     "password_id"
    t.uuid     "created_by"
    t.uuid     "updated_by"
    t.boolean  "admin"
    t.string   "session_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["name_id", "address_id", "subscriber_id", "note_id", "password_id", "admin"], name: "index_users", using: :btree

  create_table "video_infos", id: :uuid, default: "uuid_generate_v4()", force: true do |t|
    t.string   "name"
    t.string   "title"
    t.string   "display_name"
    t.text     "description"
    t.string   "video_path"
    t.string   "video_format"
    t.string   "author"
    t.string   "force_code"
    t.string   "file_size"
    t.string   "file_name"
    t.uuid     "width"
    t.uuid     "height"
    t.string   "resolution"
    t.uuid     "sequence_number"
    t.boolean  "licence"
    t.string   "licence_type"
    t.string   "licence_key"
    t.boolean  "avatar"
    t.uuid     "avatar_id"
    t.uuid     "image_id"
    t.uuid     "status_id"
    t.uuid     "version_id"
    t.string   "caption"
    t.datetime "created_by"
    t.datetime "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
