export type { IsendOtp, IverifyOtp } from './auth.type'
import type { ComponentType } from "react";


export interface IResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data: T
}



export interface ISidebarItem {
  title: string,
  items: {
    title:string,
    url: string,
    component: ComponentType
  }[];
}

