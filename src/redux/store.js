import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from './actions/signUpSlice';
import authReducer from './actions/authSlice';
import infoReducer from './actions/infoSlice';

export default configureStore({
  reducer: {
    signUp: signUpReducer,
    auth: authReducer,
    info: infoReducer,
  },
});
