class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  def site
    @site = Site.find(params[:site_id])
  end

  def page
    @page = @site.pages.find(params[:page_id])
  end

end
