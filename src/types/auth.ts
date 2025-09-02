// Authentication form types
export interface LoginFormValues {
  username: string;
  password: string;
}

export interface RegisterFormValues {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  confirm_password: string;
  avatar?: File | null;
}
