// ??? Может axios лучше импорнуть в components.ts? В этом нет необходимости, у вебпака компиляция пакета идет всего один раз
import axios from 'axios';
import { IPopup } from './types/popup.types';

export class Popup implements IPopup {
  button: HTMLElement; // Кнопка по которой был клик
  url: string; // data-popup из кнопки по которой был клик
  body: HTMLBodyElement; // Body Страницы
  popup: HTMLElement; // Весь объект попап
  popupClose: HTMLElement[]; // Кнопка закрытия попап окна(крестик)
  constructor(button: HTMLElement) {
    this.button = button;
    this.url = this.button.dataset.popup;
    this.body = document.body as HTMLBodyElement;
    this.closeOnEsc = this.closeOnEsc.bind(this);
  }

  async load(show = false): Promise<void> {
    try {
      // Запрос по url с data-popup атрибута кнопки
      // Если в запросе будет ошибка axios выкинет ее сразу
      this.button.setAttribute('disabled', ''); // блокируем кнопку от дурака

      await axios.get(this.url).then(response => {
        this.popup = new DOMParser()
          .parseFromString(response.data, 'text/html')
          .querySelector('.popup'); // Записываем попап окно в свойство класса Popup

        this.body.insertAdjacentElement('beforeend', this.popup); // Добавление попап окна в body страницы

        this.popupClose = Array.from(this.popup.querySelectorAll('.close')); // Записываем попап-бокс в свойство класса Load
        this.popupClose.push(this.popup);

        this.popupClose.forEach(item => {
          item.addEventListener('click', e => {
            if ((e.target as HTMLElement).classList.contains('close')) {
              this.close(true);
            }
          });
        });
        window.addEventListener('keydown', this.closeOnEsc);

        if (show) {
          this.show();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  show(): void {
    // ??? добавить IF проверку на popup
    this.body.classList.add('scroll-hidden');

    // Проблема заключается в оптимизации современных браузеров, они ставят очередь, а setTimeout игнорирует эту очередь
    setTimeout(() => {
      if (this.popup) {
        this.popup.classList.add('popup_show');
      }
    }, 100);
  }

  close(remove = false): void {
    this.button.removeAttribute('disabled');
    this.popup.classList.remove('popup_show');
    const popups = Array.from(document.querySelectorAll('.popup_show'));

    if (remove) {
      this.popup.addEventListener('transitionend', e => {
        if (!(popups.length > 0)) {
          this.body.classList.remove('scroll-hidden');
        }
        this.remove();
      });
    }
  }
  remove(): void {
    window.removeEventListener('keydown', this.closeOnEsc);
    this.popup.remove();
  }

  loadAndShow(): void {
    this.load(true);
  }

  closeAndRemove(): void {
    this.close(true);
  }
  private closeOnEsc(e: KeyboardEvent): void {
    const selects = Array.from(this.popup.querySelectorAll('.is-open'));
    if (e.key === 'Escape' && !(selects.length > 0)) {
      this.close(true);
    }
  }
}

const getPopup = (target: HTMLElement) => {
  const btn = new Popup(target);
  btn.loadAndShow();
};

window.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  if (target.dataset.popup) {
    getPopup(target);
  } else if (target.closest('[data-popup]')) {
    getPopup(target.closest('[data-popup]'));
  }
});
