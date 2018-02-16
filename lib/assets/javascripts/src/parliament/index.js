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

    selector.insertAdjacentHTML(
      'beforebegin',
      selector.getAttribute('data-insertion-template')
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Parliament().init();
});
