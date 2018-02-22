# TODO:
# 1. Methods add and remove associations should render a partial
# 2. We should be able to infer the form object and build the association from
#    the association param
# 3. Determine the API needed to have flexible association creation
module Parliament
  class ActionView::Helpers::FormBuilder
    def add_association(link_name, association, options = {}, &block)
      options[:'parliament-action'] = 'insert-template'
      options[:'parliament-insertion-template'] = build_insertion_template(association, options)
      @template.link_to(link_name, '#', options)
    end

    def remove_association(link_name, options = {}, &block)
      options[:'parliament-action'] = 'remove-template'

      hidden_field('_destroy', 'parliament-element' => 'remove-template') + @template.link_to(link_name, '#', options)
    end

    private

    def build_insertion_template(association, _options)
      custom_partial = nil
      partial = get_partial_path(custom_partial, association)
      new_object = create_object(object, association)
      locals = {}
      send(:fields_for, association, new_object, child_index: :parliament_child) do |builder|
        @template.render(partial, { f: builder, dynamic: true }.merge(locals))
      end
    end

    def get_partial_path(partial, association)
      partial ? partial : association.to_s.singularize + "_fields"
    end

    def create_object(object, association)
      object.send(association).build
    end
  end
end
