class PageController < ApplicationController

  def list
    @pages = Page.all
    render layout: "site", template: "page/list_page"
  end

  def edit_page

  end

end
