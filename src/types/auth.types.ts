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
