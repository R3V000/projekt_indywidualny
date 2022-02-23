export const select = {
  templateOf: {
    finder: '#template-finder',
  },
  containerOf: {
    finder: '.road-finder',
    grid: '.road-grid',
  },
  finder: {
    submitBtn: '.finder-btn',
  }
};

export const templates = {
  finder: Handlebars.compile(document.querySelector(select.templateOf.finder).innerHTML),
};

export const classNames = {
  finder: {
    active: 'active',
    field: 'field',
  },
};