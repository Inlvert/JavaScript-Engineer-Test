import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "../../api";

const SLICE_NAME = "superheroes";

let initialState = {
  superheroes: [],
  superhero: null,
  totalPages: 0,
  currentPage: 1,
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

const getSuperheroes = createAsyncThunk(
  `${SLICE_NAME}/get`,
  async (page, thunkAPI) => {
    try {
      const response = await API.getSuperheroes(page);

      const { data, totalPages, currentPage } = response;

      return { data, totalPages, currentPage };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const getSuperheroById = createAsyncThunk(
  `${SLICE_NAME}/getSuperheroById`,
  async (superheroId, thunkAPI) => {
    try {
      const response = await API.getSuperheroById(superheroId);

      const {
        data: { data: superhero },
      } = response;

      return superhero;
    } catch (error) {
      console.error("Error fetching superhero:", error);
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const updateSuperheroById = createAsyncThunk(
  `${SLICE_NAME}/updateSuperheroById`,
  async ({ superheroId, superheroData }, thunkAPI) => {
    try {
      const response = await API.updateSuperheroById({
        superheroId,
        superheroData,
      });

      const {
        data: { data: superhero },
      } = response;

      console.log(superhero);

      return superhero;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.message
      );
    }
  }
);

const deleteSuperheroById = createAsyncThunk(
  `${SLICE_NAME}/deleteSuperheroById`,
  async (superheroId, thunkAPI) => {
    try {
      const response = await API.deleteSuperheroById(superheroId);

      const {
        data: { data: superhero },
      } = response;

      return superhero;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.data.errors);
    }
  }
);

const superheroSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    nextPage: (state) => {
      state.currentPage = +state.currentPage + 1;
    },
    prevPage: (state) => {
      state.currentPage = +state.currentPage - 1;
    },
  },
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
    builder.addCase(getSuperheroes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSuperheroes.fulfilled, (state, action) => {
      const { data, totalPages, currentPage } = action.payload;
      state.isLoading = false;
      state.superheroes = data;
      state.totalPages = totalPages;
      state.currentPage = currentPage;
    });
    builder.addCase(getSuperheroes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getSuperheroById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSuperheroById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.superhero = action.payload;
    });
    builder.addCase(getSuperheroById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateSuperheroById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateSuperheroById.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.superheroes.findIndex(
        (superhero) => superhero._id === action.payload._id
      );
      if (index !== -1) {
        state.superheroes[index] = action.payload;
      }
      state.superhero = action.payload;
    });
    builder.addCase(updateSuperheroById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteSuperheroById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteSuperheroById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.superheroes = state.superheroes.filter(
        (superhero) => superhero._id !== action.payload.id
      );
    });
    builder.addCase(deleteSuperheroById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer: superheroReducer, actions } = superheroSlice;

export const { nextPage, prevPage } = actions;

export {
  createSuperhero,
  getSuperheroes,
  getSuperheroById,
  updateSuperheroById,
  deleteSuperheroById
};

export default superheroReducer;
