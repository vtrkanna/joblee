class SiteController < ApplicationController

  def list
    params[:page] ||= 1
    #@sites = Site.all.order_by({:created_at, :asc}).page params[:page]
    @sites = Site.all.desc(:name)
    render layout: "site", template: "site/list_site"
  end

  def show_site
    render layout: "site", template: "site/list_site"
  end

  def edit_site
    @site = Site.find(params[:id])
    render layout: "site", template: "site/edit_site"
  end

end
