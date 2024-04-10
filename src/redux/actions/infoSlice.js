import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedImage: null,
    location: "",
    avatar: "",
    selectedCards: [],
    loader: false,
};

const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setSelectedImage: (state, action) => {
            state.selectedImage = action.payload;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        setSelectedCards: (state, action) => {
            state.selectedCards = action.payload;
        },
        setLoader: (state, action) => {
            state.loader = action.payload;
        },
    },
});

export const { setSelectedImage, setLocation, setSelectedCards, setAvatar,setLoader } = infoSlice.actions;

export default infoSlice.reducer;
