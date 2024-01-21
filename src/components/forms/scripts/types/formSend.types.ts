import { AxiosResponse } from 'axios';

export interface IFormSend {
  form: HTMLFormElement;
  dataUrl: string;
  hash: string;
  hashUrl: string;
  method: MethodsEnum | string;
  beforeSend(): void;
  send(): void;
  completedSend(response: AxiosResponse<sendResponse>): void;
  afterSend(): void;
  setResponse(response: string, type: ResponseType): void;
}

export enum MethodsEnum {
  POST = 'POST',
  GET = 'GET',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface sendResponse {
  fieldResponse: {
    success: string;
    error: string;
  };
  fieldValidation: {
    valid: {
      [key: string]: string;
    };
    invalid: {
      [key: string]: string;
    };
  };
}

export enum ResponseType {
  success = 'success',
  error = 'error',
}
