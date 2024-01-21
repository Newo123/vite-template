import Choices from 'choices.js';
import { IForm } from './types/form.types';

export class Form implements IForm {
  form: HTMLFormElement;
  focusInput: HTMLElement;
  constructor(form: HTMLFormElement) {
    this.form = form;
    this.focusInput = this.form.querySelector('[data-focused]');

    this.focusInput && this.focus(this.focusInput);
  }
  focus(input: HTMLElement): void {
    input.focus();
  }
}

let observer = new MutationObserver(function (mutations, observer) {
  mutations.forEach(mutation => {
    // Собирать конкретно формы
    const popup = (mutation.target as HTMLElement).querySelector('.popup');

    if (popup) {
      const popupForms = Array.from(popup.querySelectorAll('form'));
      if (popupForms.length > 0) {
        popupForms.forEach(form => {
          new Form(form);
          // перенести инит селекта в класс формы
          const selects = Array.from(form.querySelectorAll('select'));

          if (selects.length > 0) {
            selects.forEach(select => {
              const newSelect = new Choices(select, {
                allowHTML: true,
                searchEnabled: false,
                itemSelectText: '',
                // @ts-ignore
                // ??? Где то здесь нужно добавить нужны класс скролла
                classNames: {
                  containerOuter: 'choices',
                  containerInner: 'form__control form__control-select',
                  list: 'form__select-list',
                  item: 'form__select-item',
                  placeholder: 'form__select-placeholder',
                  itemChoice: 'form__select-item-choice',
                },
              });
            });
          }
        });
      }
    }
  });
});

observer.observe(document, {
  subtree: true,
  attributes: true,
});
