export interface IAuthModel {
  accessToken: string
  refreshToken: string
}

export interface IAuthVerificationModel {
  email: string
  otp: string
}
