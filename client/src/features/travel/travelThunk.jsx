import { showLoading, hideLoading, getAllTravels } from '../allTravels/allTravelsSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './travelSlice';

export const createTravelThunk = async (travel, thunkAPI) => {
  try {
    const resp = await customFetch.post('/travel', travel);
    thunkAPI.dispatch(clearValues());
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deleteTravelThunk = async (travelId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/travel/${travelId}`);
    thunkAPI.dispatch(getAllTravels()); // Ajustar
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editTravelThunk = async ({ travelId, travel }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/travel/${travelId}`, travel);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
