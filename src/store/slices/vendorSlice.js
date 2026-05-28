import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { vendorService } from '../../api/services'

export const fetchVendors = createAsyncThunk(
  'vendor/fetchVendors',
  async (params, { rejectWithValue }) => {
    try {
      const response = await vendorService.getVendors(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const createVendor = createAsyncThunk(
  'vendor/createVendor',
  async (data, { rejectWithValue }) => {
    try {
      const response = await vendorService.createVendor(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

const initialState = {
  list: [],
  loading: false,
  error: null,
}

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.data || []
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createVendor.fulfilled, (state, action) => {
        state.list.unshift(action.payload)
      })
  },
})

export default vendorSlice.reducer
