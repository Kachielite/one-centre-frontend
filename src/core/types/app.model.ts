export interface IGeneralResponseWithDataModel<T> {
  success: boolean
  message: string
  data: T | null
}

export type IGeneralResponseModel = Omit<
  IGeneralResponseWithDataModel<null>,
  "data"
>

export interface IErrorResponseModel {
  statusCode: number
  message: string
  error: string
}
