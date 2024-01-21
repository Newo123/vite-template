export interface IPopup {
  button: HTMLElement;
  close: () => void;
  remove: () => void;
  load: (show: boolean) => void;
  show: () => void;
  closeAndRemove: () => void;
  loadAndShow: () => void;
}
