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
    @site = Site.new(site_params)
    domain = Domain.new({:url => params[:site][:domain], :url_type => "site_url", :version => "1", :site_id => @site.id, :active => true })
    if @site.save
      domain.save
      redirect_to action: :list
    else
      render action: :new_site
    end
  end

  private

  def site_params
    params.require(:site).permit(:name, :alt_name, :layout)
  end

end
