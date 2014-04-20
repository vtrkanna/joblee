class SiteController < ApplicationController

  def list
    params[:page] ||= 1
    @sites = Site.order(:created_at).page params[:page]
  end

  def edit_site
    @site = Site.find(params[:id])
  end

end
