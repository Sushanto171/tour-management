/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISendOtp {
  email: string;
}

export interface IVerifyOtp {
  otp: string;
  email: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface IMe {
  _id: string
  name: string
  email: string
  role: string
  picture: string
  isActive: string
  isDeleted: boolean
  isVerified: boolean
  auths: any[]
  bookings: any[]
  guides: any[]
  createdAt: string
  updatedAt: string
}