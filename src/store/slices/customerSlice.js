import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customerService } from '../../api/services'

export const fetchCustomers = createAsyncThunk(
  'customer/fetchCustomers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await customerService.getCustomers(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (data, { rejectWithValue }) => {
    try {
      const response = await customerService.createCustomer(data)
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

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.data || []
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.list.unshift(action.payload)
      })
  },
})

export default customerSlice.reducer
