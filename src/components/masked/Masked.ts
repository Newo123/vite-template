import IMask from 'imask';
import { FocusEnum } from './types/masked.types';

const toggleMask = (input: HTMLElement, type: FocusEnum): void => {
  let mask: any = IMask(input, {
    mask: input.dataset.mask,
  });
  if (type === FocusEnum.focusin) {
    mask.updateOptions({
      lazy: false,
    });
    mask.alignCursor();
  } else if (type === FocusEnum.focusout) {
    if (!mask.masked.isComplete) {
      mask.updateOptions({
        lazy: true,
      });
      mask.value = '';
    }
  }
};
for (const value in FocusEnum) {
  window.addEventListener(value, e => {
    const target = e.target as HTMLElement;

    if (target.dataset.mask) {
      toggleMask(target, value as FocusEnum);
    }
  });
}
