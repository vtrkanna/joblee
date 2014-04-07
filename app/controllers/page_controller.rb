class PageController < ApplicationController

  def list
    @pages = Page.all
    render layout: "site", template: "page/list_page"
  end

end
