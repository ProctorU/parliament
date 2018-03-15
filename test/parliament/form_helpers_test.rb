require 'test_helper'

class Parliament::FormBuilderTest < ActionView::TestCase
  setup do
    @post = Post.create(title: "Testing")
    @post.comments << Comment.create(comment: "Testing")
  end

  test 'remove_association returns post[comments_attributes]' do
    assert_includes form_string, 'post[comments_attributes][0][id]'
  end

  test 'remove_association returns hidden field' do
    assert_includes form_string, 'type="hidden"'
  end

  test 'add_association returns a link' do
    assert_includes form_string_add, 'link_name_add'
  end

  test 'add_association returns a insertion-template' do
    assert_includes form_string_add, 'insert-template'
    assert_includes form_string_add, 'post[comments_attributes][parliament_child][comment]'
  end

  private

  def form_string
    @form_string ||= form_for(@post) do |f|
      f.fields_for :comments do |comment|
        comment.remove_association('link_name')
      end
    end
  end

  def form_string_add
    @form_string ||= form_for(@post) do |f|
      f.add_association('link_name_add', :comments)
    end
  end
end
