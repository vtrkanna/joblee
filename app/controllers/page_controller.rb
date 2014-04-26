class PageController < ApplicationController

  def list
    @pages = Page.all
    render layout: "site", template: "page/list_page"
  end

  def new_page
    @page = @site.pages.new
  end

  def edit_page
    @page = @site.pages.find(params[:page_id])
  end

end
