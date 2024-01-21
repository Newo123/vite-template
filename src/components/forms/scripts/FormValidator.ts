window.addEventListener(
  'invalid',
  e => {
    const target = e.target as HTMLElement;
    if (target) {
      target.classList.add('form__control_invalid');
      target.addEventListener('change', FormValidator.checkField);
    }
  },
  true,
);

export class FormValidator {
  constructor() {}
  static checkField = (e: Event): void => {
    const target = e.target as HTMLElement;
    if (!(target as HTMLFormElement).checkValidity()) {
      target.classList.add('form__control_invalid');
    } else {
      target.classList.remove('form__control_invalid');
    }
  };
}
