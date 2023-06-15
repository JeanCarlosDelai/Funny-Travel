import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

export const getAllTravelsThunk = async (_, thunkAPI) => {
  const { page, search, sort } =
    thunkAPI.getState().allTravels;

  let url = `/travel?sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getAllTravelsAllThunk = async (_, thunkAPI) => {
  const { page, search, sort } =
    thunkAPI.getState().allTravels;

  let url = `/travel/all?sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};