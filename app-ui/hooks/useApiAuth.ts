import useAxios from "./useAxios";

export interface Credentials {
  username: string;
  password: string;
}

export default function useAuthApi() {
  const baseRoute = 'auth/';
  const axios = useAxios();

  const login = async (data: Credentials): Promise<Credentials> => {
    const response = await axios.post<Credentials>(`${baseRoute}login`, data);
    return response.data;
  };

  const logout = async (email: string): Promise<void> => {
    await axios.post<Credentials>(`${baseRoute}logout`, email);
  };

  return {
    login,
    logout
  };
}