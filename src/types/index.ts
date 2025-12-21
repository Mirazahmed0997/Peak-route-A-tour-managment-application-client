export type {IsendOtp, IverifyOtp} from './auth.type'

export interface IResponse<T> {
    success: boolean
    statusCode: number
    message: string
    data: T
  }
  