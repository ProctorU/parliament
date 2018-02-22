class Parliament {
  constructor() {
    this.insertSelectors = document.querySelectorAll(
      '[parliament-action="insert-template"]'
    );

    this.removeSelectors = document.querySelectorAll([
      '[parliament-action="remove-template"]'
    ]);
  }

  canRemoveTemplate(target) {
    return target.getAttribute('parliament-action') === 'remove-template';
  }

  init() {
    this.insertSelectors.forEach(selector => {
      selector.addEventListener(
        'click',
        this.insertTemplate.bind(this, selector)
      );
    });

    document.body.addEventListener('click', event => {
      if (this.canRemoveTemplate(event.target)) {
        event.preventDefault();

        this.removeTemplate(event.target);
      }
    });
  }

  insertTemplate(selector, event) {
    event.preventDefault();

    let template = selector.getAttribute('parliament-insertion-template');
    template = template.replace(/parliament_child/g, new Date().getTime());

    selector.insertAdjacentHTML('beforebegin', template);
  }

  removeTemplate(target) {
    const parent = target.closest('.nested-fields');
    const input = parent.querySelector(
      '[parliament-element="remove-template"]'
    );

    input.setAttribute('value', true);
    parent.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Parliament().init();
});
