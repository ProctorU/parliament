# Parliament 🔨

Vanilla javascript nested form builder.

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

Given a simple application with Tasks belonging to Projects, the first thing to do is allow your Project model to accepts_nested_attributes_for.

**Models**

```ruby
class Project < ApplicationRecord
  has_many :tasks, inverse_of: :project
  accepts_nested_attributes_for :tasks, reject_if: :all_blank, allow_destroy: true
end

class Task < ApplicationRecord
  belongs_to :project
end
```

Because Rails 5 and above belongs_to associations are required by default, we must specify the link because the child object(tasks) cannot be saved until the parent (a project) is saved.

Moving on, we'll need to add the parameters to the controller.

**Controller**

```ruby
# ProjectsController

private

def project_params
  params.require(:project).permit(:name, :description, tasks_attributes: [:id, :description, :done, :_destroy])
end
```

Notice how we added the _destroy parameter, this is important to allow us to remove the records. Additionally, the id parameter is required.

**Form**

Inside of our Project form, we'll have a simple fields_for addition that will loop through all of the tasks and render a `task_fields` partial which will contain the elements used for entering a new task, or modifying an existing task.


```erb
<div class="form-group">
  <%= f.label(:tasks) %>

  <%= f.fields_for :tasks do |task| %>
    <%= render 'task_fields', f: task %>
  <% end %>

  <%= f.add_association 'Add Task',
    'tasks',
    class: 'btn btn-secondary btn-sm' %>
</div>
```

Additionally, we call `f.add_association` a FormBuilder method to add another field so you can add an additional task. While other gems like Cocoon take a global approach with a helper, this scopes things to forms so they are not globally available.

**_task_fields.html.erb**
```erb
<div class="nested-fields mb-1">
    <div class="input-group">
      <%= f.text_field :description, { class: "form-control" }%>

      <%# For more complicated associations, this could be a select dropdown instead or multiple fields %>

      <span class="input-group-append">
        <%= f.remove_association 'Remove', { class: 'btn btn-outline-danger' } %>
      </span>
    </div>
  </div>
</div>
```

The two important bits here are the `.nested-fields` class added to the parent element, and the `f.remove_association` form builder link we provide, this communicates with the Javascript so that it removes the proper element if the user clicks the remove button.


## Developing

1. Thank you! We love [our contributors](https://github.com/:owner/:name/graphs/contributors)!
1. Clone the repository.
1. Make your changes in a thoughtfully-named branch.
1. Ensure 1:1 test coverage.
1. Submit a [Pull Request](https://github.com/:owner/:name/pulls)!
1. Celebrate! :tada:

## License

This project rocks and uses MIT-LICENSE.

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
