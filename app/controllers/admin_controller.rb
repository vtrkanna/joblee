class AdminController < ApplicationController

  def home_page
    render layout: "site", template: "home/home"
  end
end
