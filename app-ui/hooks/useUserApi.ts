import useAuthApi, { Credentials } from "./useApiAuth";
import { useAppDispatch } from "../redux/hooks";
import { logInAction, logoutAction } from "../reducers/userSlice";
import { setLoginStateAction } from "../reducers/authSlice";

interface IUseUserApi {
  logIn: (data: Credentials) => Promise<void>;
  logOut: (email: string) => Promise<void>;
}

export default function useUserApi(): IUseUserApi {
  const authApi = useAuthApi();
  const dispatch = useAppDispatch();

  const logIn = async (data: Credentials): Promise<void> => {
    try {
      const response = await authApi.login(data);

      console.log(response);

      dispatch(logInAction(response));
      dispatch(setLoginStateAction(true));
    } catch (error: any) {
      alert(error.message);
    }
  };

  const logOut = async (email: string): Promise<void> => {
    try {
      await authApi.logout(email);

      dispatch(logoutAction());
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return {
    logIn,
    logOut
  };
}