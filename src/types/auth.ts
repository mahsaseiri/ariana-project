// Authentication form types
export interface LoginFormValues {
  username: string;
  password: string;
}

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  image?: File | null;
}
