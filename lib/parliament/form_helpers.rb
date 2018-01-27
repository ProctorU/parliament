# TODO:
# 1. Methods add and remove associations should render a partial
# 2. We should be able to infer the form object and build the association from
#    the association param
# 3. Determine the API needed to have flexible association creation
module Parliament
  class ActionView::Helpers::FormBuilder
    def add_association(link_name, association, options = {}, &block)
    end

    def remove_association(link_name, options = {}, &block)
    end

    private

    def render_association
    end

    def create_association
    end
  end
end