export interface IHeader {
  header: HTMLElement;
  scrollTop: number;
  currentScrollTop: number;
  body: HTMLElement;
  setListenerToScroll(): void;
}

export interface IHeaderProperty {
  selector: string;
}
