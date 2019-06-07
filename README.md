# Parliament 🔨

Vanilla JavaScript nested form builder. Its name is derived from ProctorU's mascot, which is an owl. A group of owls when assembled is called a parliament, and it was in fact a parliament that created this gem.

## Table of contents

* [Installation](#installation)
* [Usage](#usage)
* [Developing](#developing)
* [License](#license)
* [Credits](#credits)

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'parliament'
```

And then execute:

```bash
$ bundle
```

Or install it yourself as:

```bash
$ gem install parliament
```

**Note**: If you use turbolinks, this should be placed _after_ loading turbolinks.

In your application.js:

```javascript
//= require parliament
```
## Usage

**Models**

* Add `accepts_nested_attributes_for` to your parent.
* Add `belongs_to` to your association.

**Controllers**

Add the parameters to your controllers for strong params
- `id` and `_destroy` are required for Strong Params.

Example:

  ```ruby
  # Projects Controller
  # app/controllers/projects_controller.rb

  private

  def project_params
    params.require(:project).permit(:name, :description, tasks_attributes: [:id, :description, :done, :_destroy])
  end
  ```

**Form**

* Add a `fields_for` loop that you render your fields partial from, passing each object to it.
* Ensure you call the `f.add_association` helper where you want the link displayed that a user will press to inject another field onto the DOM.

In the case of a Project/Tasks association:

Example:

  ```erb
  # Rest of file omitted
  <div class="form-group">
    <%= f.label(:tasks) %>

    <%= f.fields_for :tasks do |task| %>
      <%= render 'task_fields', f: task %>
    <% end %>

    <%= f.add_association 'Add Task',
      'tasks',
      class: 'btn btn-secondary btn-sm' %>
  </div>

  # Rest of file omitted
  ```

Inside of your record's fields partial:

* Use the `f.remove_association` helper. This will execute JavaScript to remove the proper element from the page.
* Ensure the contents of the fields are wrapped in a div with the `nested-fields` CSS class.

**_task_fields.html.erb**
```erb
<div class="nested-fields">
  <%= f.text_field :description, class: "form-control" %>

  <%= f.check_box :done %>
  <%= f.label :done %>

  <%= f.remove_association 'Remove', { class: 'btn btn-outline-danger' } %>
</div>
```

## Developing

1. Thank you! We love [our contributors](https://github.com/ProctorU/parliament/graphs/contributors)!
1. Clone the repository.
1. Make your changes in a thoughtfully-named branch.
1. Ensure 1:1 test coverage.
1. Submit a [Pull Request](https://github.com/ProctorU/parliament/pulls)!
1. Celebrate! :tada:

## License

This project uses MIT-LICENSE.

## Credits

Parliament is maintained and funded by [ProctorU](https://twitter.com/ProctorU),
a simple online proctoring service that allows you to take exams or
certification tests at home.

<br>

<p align="center">
  <a href="https://twitter.com/ProctorUEng">
    <img src="https://s3-us-west-2.amazonaws.com/dev-team-resources/procki-eyes.svg" width=108 height=72>
  </a>

  <h3 align="center">
    <a href="https://twitter.com/ProctorUEng">ProctorU Engineering & Design</a>
  </h3>
</p>
