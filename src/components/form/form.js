import '../../assets/js/polyfills/placeholder-shown.polyfill';
import '../../assets/js/polyfills/remove.polyfill';
import '../../assets/js/polyfills/closest.polyfill';

import ValidForm from '@pageclip/valid-form';

const formElement = document.querySelector('form');
ValidForm(formElement);

// handle multiple required on grouped elements (checkbox, radio)
let checkboxesNames = [];
const checkboxes = formElement.querySelectorAll('[type="checkbox"][required]');
Array.prototype.slice.call(checkboxes).forEach(function (el) {
  var name = el.name;

  if (checkboxesNames.indexOf(name) === -1) {
    checkboxesNames.push(name);
  }
});

let radiobuttonNames = [];
const radiobuttons = formElement.querySelectorAll('[type="radio"][required]');
Array.prototype.slice.call(radiobuttons).forEach(function (el) {
  var name = el.name;

  if (radiobuttonNames.indexOf(name) === -1) {
    radiobuttonNames.push(name);
  }
});

checkboxesNames.forEach(function (name) {
  var group = document.querySelectorAll('[name="' + name + '"]');

  Array.prototype.slice.call(group).forEach(function (el) {
    el.addEventListener('change', handleRequired);
  });

  setRequired(name);
});

radiobuttonNames.forEach(function (name) {
  var group = document.querySelectorAll('[name="' + name + '"]');

  Array.prototype.slice.call(group).forEach(function (el) {
    el.addEventListener('change', handleRequired);
  });

  setRequired(name);
});

function handleRequired (event) {
  setRequired(this.name, event);
}

function setRequired (name, event) {
  var event = event || false;
  var group = document.querySelectorAll('[name="' + name + '"]');

  Array.prototype.slice.call(group).forEach(function (el, index) {
    if (event) {
      if (el.checked) {
        el.setAttribute('required', true);
      } else {
        el.removeAttribute('required');
      }
    } else {
      if (index == 0) {
        el.setAttribute('required', true);
      } else {
        el.removeAttribute('required');
      }
    }
  });

  console.log(event);
}
