export enum ResponseStatus {
  Success = 'success',
  Error = 'error',
}

export interface IResponse<T = any> {
  data: T;
  status: ResponseStatus;
  message: string;
}
