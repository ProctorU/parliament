class Parliament {
  constructor() {
    this.actionSelectors = document.querySelectorAll(
      '[data-action="insert-template"]'
    );
  }

  init() {
    this.actionSelectors.forEach(selector => {
      selector.addEventListener('click', this.handleClick.bind(this, selector));
    });
  }

  handleClick(selector, event) {
    event.preventDefault();

    let template = selector.getAttribute('data-insertion-template');
    template = template.replace(/parliament_child/g, new Date().getTime());

    selector.insertAdjacentHTML('beforebegin', template);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Parliament().init();
});
