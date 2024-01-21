// ??? Может axios лучше импорнуть в components.ts?
import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  IFormSend,
  MethodsEnum,
  ResponseType,
  sendResponse,
} from './types/formSend.types';

window.addEventListener('submit', e => {
  e.preventDefault();
  const target = e.target as HTMLFormElement;
  // сделать проверку на атрибут data-send +
  if (target && target.dataset.send) {
    const formSend = new FormSend(target);
  }
});

window.addEventListener(
  'click',
  e => {
    const target = e.target as HTMLElement;
    if (target.dataset.button && target.dataset.button === 'back') {
      target.addEventListener('click', FormSend.methodBackToForm);
    }
  },
  true,
);

export class FormSend implements IFormSend {
  form: HTMLFormElement;
  dataUrl: string = '/mocks/mocksSend.php';
  hash: string = '';
  hashUrl: string = '';
  method: MethodsEnum | string = MethodsEnum.POST;
  constructor(form: HTMLFormElement) {
    this.form = form;

    if (this.form.dataset.send) {
      this.dataUrl = this.form.dataset.send;
    }
    if (this.form.dataset.hash) {
      this.hashUrl = this.form.dataset.hash;
    }
    if (this.form.dataset.method) {
      this.method = this.form.dataset.method;
    }

    this.send();
  }

  static methodBackToForm(e) {
    const target = e.target as HTMLElement;
    if (target) {
      if (target.closest('form').classList.contains('form_error')) {
        target.closest('form').classList.remove('form_error');
      } else if (target.closest('form').classList.contains('form_success')) {
        target.closest('form').classList.remove('form_success');
      }
    }
  }

  beforeSend(): void {
    this.form.classList.add('form_loading');
  }
  async send(): Promise<void> {
    try {
      this.beforeSend();
      const formData = new FormData(this.form);
      const url = this.dataUrl;

      if (this.hashUrl) {
        this.hash = await axios(this.hashUrl, { method: MethodsEnum.GET }).then(
          response => response.data,
        );
      }
      if (this.hash) {
        // сделать проверку на наличие hash +
        formData.append('hash', this.hash);
      }

      const response: AxiosResponse<sendResponse> = await axios(url, {
        method: this.method,
        data: formData,
      });
      this.completedSend(response);

      // Нужно проверять response
    } catch (error) {
      // дефолтный респонс ошибки
      this.form.classList.add('form_error');
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      } else if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      this.afterSend();
    }
  }

  completedSend(response: AxiosResponse<sendResponse>): void {
    if (response?.data?.fieldResponse) {
      // респонс ошибки или успеха
      if (response.data.fieldResponse.success) {
        this.setResponse(
          response.data.fieldResponse.success,
          ResponseType.success,
        );
      } else if (response.data.fieldResponse.error) {
        this.setResponse(response.data.fieldResponse.error, ResponseType.error);
      }
    } else if (response?.data?.fieldValidation) {
      // добавление фидбека валидных и не валидных полей
      /////////
      ////////
      ///////
      if (response.data.fieldValidation.invalid) {
        for (const field in response.data.fieldValidation.invalid) {
          const fieldInvalid = document.querySelector(`[name="${field}"]`);
          const invalidMessage = document.querySelector(
            `[name="${field}"] ~ .form__feedback-invalid`,
          );
          fieldInvalid.classList.add('is-invalid');
          fieldInvalid.classList.add('was-validated');
          invalidMessage.innerHTML =
            response.data.fieldValidation.invalid[field];
        }
      }
      /////////
      ////////
      ///////
      if (response.data.fieldValidation.valid) {
        for (const field in response.data.fieldValidation.valid) {
          const fieldValid = document.querySelector(`[name="${field}"]`);
          const validMessage = document.querySelector(
            `[name="${field}"] ~ .form__feedback-valid`,
          );
          fieldValid.classList.add('is-valid');
          fieldValid.classList.add('was-validated');
          validMessage.innerHTML = response.data.fieldValidation.valid[field];
        }
      }
      /////////
      ////////
      ///////
    } else {
      // дефолтный респонс успеха
      /////////
      ////////
      ///////
      this.form.classList.add('form_success');
      /////////
      ////////
      ///////
    }
  }

  afterSend(): void {
    this.form.classList.remove('form_loading');
  }

  setResponse(response: string, type: ResponseType): void {
    const success = this.form.querySelector(`.form__response-${type}`);
    if (success) {
      success.innerHTML = response;
      this.form.classList.add(`form_${type}`);
    }
  }
}
