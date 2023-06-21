import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createTravelThunk, deleteTravelThunk, editTravelThunk } from './travelThunk';
const initialState = {
  isLoading: false,
  travelName: '',
  location: '',
  description: '',
  characteristics: '',
  image: '',
  price: 0,
  isEditing: false,
  editTravelId: '',
};

export const createTravel = createAsyncThunk('travel/createTravel', createTravelThunk);

export const deleteTravel = createAsyncThunk('travel/deleteTravel', deleteTravelThunk);

export const editTravel = createAsyncThunk('travel/editTravel', editTravelThunk);

const travelSlice = createSlice({
  name: 'travel',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      if (name === 'price') {
        value = parseFloat(value);
      }
      state[name] = value;

    },
    clearValues: () => {
      return {
        ...initialState,
        location: getUserFromLocalStorage()?.location || '',
      };
    },
    setEditTravel: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },

  // Manipuladores de ações assíncronas
  extraReducers: (builder) => {
    builder
      .addCase(createTravel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTravel.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Viagem criada');
      })
      .addCase(createTravel.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteTravel.fulfilled, (state, { payload }) => {
        toast.success('Viagem excluída..');
      })
      .addCase(deleteTravel.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(editTravel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTravel.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Viagem modificada...');
      })
      .addCase(editTravel.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
  },
});

export const { handleChange, clearValues, setEditTravel } = travelSlice.actions;

export default travelSlice.reducer;
