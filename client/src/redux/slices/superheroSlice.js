import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";

const SLICE_NAME = "superheroes";

let initialState = {
  superheroes: [],
  isLoading: null,
  error: null,
};

const createSuperhero = createAsyncThunk(
  `${SLICE_NAME}/post`,
  async (superheroData, thunkAPI) => {
    try {
      const response = await API.createSuperhero(superheroData);

      const {
        data: { data: superhero },
      } = response;

      console.log(superhero);

      return superhero;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const superheroSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createSuperhero.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createSuperhero.fulfilled, (state, action) => {
      state.isLoading = false;
      state.superheroes.push(action.payload);
    });
    builder.addCase(createSuperhero.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer: superheroReducer, actions } = superheroSlice;

export { createSuperhero };

export default superheroReducer;
