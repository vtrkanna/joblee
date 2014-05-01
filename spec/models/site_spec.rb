require 'spec_helper'

describe Site do
  before(:each) do
    @site = {
        name: 'Name',
        domain_id: '1',
        layout: 'site',
        active: true,
        status_id: '2'
    }
  end
end