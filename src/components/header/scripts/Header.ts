import { IHeader, IHeaderProperty } from './types/header.types';

export class Header implements IHeader {
  body: HTMLElement = document.body;
  header: HTMLElement;
  scrollTop: number = scrollY;
  currentScrollTop: number = scrollY;

  constructor({ selector }: IHeaderProperty) {
    this.header = document.querySelector(selector) as HTMLElement;
    this.setListenerToScroll = this.setListenerToScroll.bind(this);
    if (this.header) {
      window.addEventListener('scroll', this.setListenerToScroll);
      document.addEventListener('DOMContentLoaded', this.setListenerToScroll);
    }
  }

  setListenerToScroll(): void {
    this.currentScrollTop = this.scrollTop;
    this.scrollTop = scrollY;

    if (this.currentScrollTop > this.header.clientHeight) {
      this.body.classList.add('fixed-header');
      if (this.scrollTop > this.currentScrollTop) {
        this.header.classList.remove('show');
      } else if (this.scrollTop < this.currentScrollTop) {
        this.header.classList.add('show');
      }
    } else {
      this.body.classList.remove('fixed-header');
      this.header.classList.remove('show');
    }
  }
}

new Header({ selector: '.header' });
