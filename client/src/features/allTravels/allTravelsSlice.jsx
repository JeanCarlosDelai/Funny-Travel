import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllTravelsThunk, getAllTravelsAllThunk } from "./allTravelThunk";

const initialFiltersState = {
  search: "",
  sort: "latest",
  sortOptions: ["Mais recente", "Mais antigo", "a-z", "z-a"],
};

const initialState = {
  isLoading: true,
  travels: [],
  totalTravels: 0,
  numOfPages: 1,
  page: 1,
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllTravels = createAsyncThunk(
  "allTravels/getTravels",
  getAllTravelsThunk
);

export const getAllTravelsAll = createAsyncThunk(
  "allTravelsAll/getTravels",
  getAllTravelsAllThunk
);

const allTravelsSlice = createSlice({
  name: "allTravels",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllTravelsState: (state) => initialState,
  },
  extraReducers: {
    [getAllTravels.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllTravels.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.travels = payload.travels;
      state.numOfPages = payload.numOfPages;
      state.totalTravels = payload.totalTravels;
    },
    [getAllTravels.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [getAllTravelsAll.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllTravelsAll.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.travels = payload.travels;
      state.numOfPages = payload.numOfPages;
      state.totalTravels = payload.totalTravels;
    },
    [getAllTravelsAll.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllTravelsState,
} = allTravelsSlice.actions;

export default allTravelsSlice.reducer;
