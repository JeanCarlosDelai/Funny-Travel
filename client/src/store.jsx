import { configureStore } from '@reduxjs/toolkit';
import travelSlice from './features/travel/travelSlice';
import userSlice from './features/user/userSlice';
import allTravelsSlice from './features/allTravels/allTravelsSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    travel: travelSlice,
    allTravels: allTravelsSlice,
  },
});
