import type { IAuthTokenDTO } from "@/feature/auth/types/auth.dto.ts"
import type { IAuthModel } from "@/feature/auth/types/auth.model.ts"

export const mapAuthToken = (authDTO: IAuthTokenDTO): IAuthModel => {
  return {
    accessToken: authDTO.access_token,
    refreshToken: authDTO.refresh_token,
  }
}
