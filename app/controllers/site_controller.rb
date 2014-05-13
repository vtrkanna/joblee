class SiteController < ApplicationController

  def list
    params[:page] ||= 1
    #@sites = Site.all.order_by({:created_at, :asc}).page params[:page]
    @sites = Site.all.desc(:name)
    render layout: "site", template: "site/list_site"
  end

  def new_site
    @site = Site.new
    render layout: "site", template: "site/new_site"
  end

  def show_site
    render layout: "site", template: "site/list_site"
  end

  def edit_site
    @site = Site.find(params[:id])
    render layout: "site", template: "site/edit_site"
  end


  def create_site
    Site.transaction do
      @site = Site.new(site_params)
      @site.active = true
      if @site.save
        domain = @site.domains.new(:url => params[:domain], :url_type => "Site_Url", :version => 1, :active => true)
        domain.save
        redirect_to action: :list
      else
        redirect_to action: :new_site
      end
    end
  end

  private

  def site_params
    params.require(:site).permit(:name, :alt_name, :layout, :active, domain:{:url=>"" })
  end

end
