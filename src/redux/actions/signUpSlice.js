import { createSlice } from '@reduxjs/toolkit';

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState: {
    formData: {
      name: '',
      userName: '',
      email: '',
      password: '',
      terms: false
    },
    errors: {},
    showToast: false,
    toastMessage: ''
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setShowToast: (state, action) => {
      state.showToast = action.payload;
    },
    setToastMessage: (state, action) => {
      state.toastMessage = action.payload;
    },
  },
});

export const { setFormData, setErrors, setShowToast, setToastMessage } = signUpSlice.actions;

export default signUpSlice.reducer;
