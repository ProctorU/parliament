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

    def build_insertion_template(association, options)
      custom_partial = options[:custom_partial]
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
      return object.send(association).build if object.class.reflect_on_association(association)
      object.send("build_#{association.to_s.singularize}")
    end
  end
end
