import type { AxiosError } from "axios"
import type { IErrorResponseModel } from "@/core/types/app.model.ts"

export const mapAPIErrorToMessage = (
  error: AxiosError
): IErrorResponseModel => {
  if (error.response && error.response.data) {
    const data = error.response.data as IErrorResponseModel
    return {
      statusCode: data.statusCode,
      message: data.message,
      error: data.error,
    }
  } else {
    return {
      statusCode: 500,
      message: "An unexpected error occurred",
      error: "Internal Server Error",
    }
  }
}
