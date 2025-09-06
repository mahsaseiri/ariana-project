import { LoginFormValues } from "../types/auth";
import { _http } from "./_http";

export const authService = {
  login: async (data: LoginFormValues) => {
    const response = await _http.post(`staff/auth/`, data);
    return response;
  },
  register: async (data: FormData) => {
    const response = await _http.post(`staff/register/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
  getUser: async () => {
    const response = await _http.get(`staff/current_user/`);
    return response;
  },
};
