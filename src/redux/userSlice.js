import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: '',
  },
  reducers: {
    update: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    updateProfileImage: (state, action) => {
      state.profileImage = action.payload.profileImage;
    },
    reset: (state) => {
      state.name = '';
      state.email = '';
      state.profileImage = '';
    },
  },
});

export const { update, updateProfileImage, reset } = userSlice.actions;
export default userSlice.reducer;
