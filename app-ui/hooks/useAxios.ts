import axios, { AxiosError, AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { logoutAction } from "../reducers/userSlice";
import { useAppDispatch } from "../redux/hooks";
import { RootState } from "../redux/store";

interface UseAxios {
  get: <T>(route: string) => Promise<T>;
  post: <T>(route: string, data?: any) => Promise<AxiosResponse<T>>;
}

export default function useAxios(): UseAxios {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useAppDispatch();
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API!}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  instance.interceptors.response.use(
    response => response,
    (error: AxiosError<any>) => {
      let errorMessage: string = error.message;

      if (error.response?.status === 401)
        dispatch(logoutAction());

      if (error.response?.status === 0) {
        dispatch(logoutAction());

        console.error('Sorry, we have some internal issues');
        throw new Error('Sorry, we have some internal issues');
      }

      if (error.response && error.response.data.message)
        errorMessage = error.response.data.message;

      console.error(errorMessage);

      throw new Error(`${error.message}. \n${errorMessage}`);
    }
  );

  const get = async <T>(route: string): Promise<T> => {
    return (await instance.get<T>(route)).data;
  };

  const post = async <T>(route: string, data?: any): Promise<T> => {
    return instance.post(route, data);
  };

  return {
    get,
    post
  };
};