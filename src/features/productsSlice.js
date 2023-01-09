import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const result = await response.json();
      return result;
    } catch (err) {
      return err.message;
    }
  }
);

const initialState = {
  value: [],
  loading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(state, action);
        state.value = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        console.log(state, action);
      });
  },
});

export default productsSlice.reducer;
