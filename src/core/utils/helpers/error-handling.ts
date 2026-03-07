import type { AxiosError } from "axios"
import { mapAPIErrorToMessage } from "@/core/types/app.mapper.ts"

export const serviceErrorHandler = (err: AxiosError, serviceName: string) => {
  const error = mapAPIErrorToMessage(err)
  console.error(`${serviceName} Error:`, error)
  throw new Error(error.message)
}
