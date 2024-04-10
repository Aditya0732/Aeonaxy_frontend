import axios from 'axios';
import { setAccessToken, setRefreshToken } from '../redux/actions/authSlice';

const setupAxiosInterceptor = (dispatch) => {
  axios.interceptors.response.use(
    (response) => {
      // Extract tokens from response cookies
      const accessToken = response.headers['set-cookie']?.find(cookie => cookie.startsWith('accessToken'))?.split('=')[1];
      const refreshToken = response.headers['set-cookie']?.find(cookie => cookie.startsWith('refreshToken'))?.split('=')[1];
      console.log("acceess token",accessToken);
      // Dispatch actions to store tokens in Redux store
      if (accessToken) {
        dispatch(setAccessToken(accessToken));
      }
      if (refreshToken) {
        dispatch(setRefreshToken(refreshToken));
      }

      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptor;
