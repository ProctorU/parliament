require 'test_helper'

class Parliament::Test < ActiveSupport::TestCase
  test 'parliament is a module' do
    assert_kind_of Module, Parliament
  end
end
