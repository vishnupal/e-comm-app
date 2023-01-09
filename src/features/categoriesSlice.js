import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async () => {
    try {
      const response = await fetch(
        'https://fakestoreapi.com/products/categories'
      );
      const result = await response.json();
      return result;
    } catch (err) {
      return err.message;
    }
  }
);
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    value: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        console.log(state, action);
        state.value = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default categoriesSlice.reducer;
