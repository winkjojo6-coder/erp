import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { accountsPayableService } from '../../api/services'

export const fetchBills = createAsyncThunk(
  'ap/fetchBills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await accountsPayableService.getBills()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bills')
    }
  }
)

export const createBill = createAsyncThunk(
  'ap/createBill',
  async (data, { rejectWithValue }) => {
    try {
      const response = await accountsPayableService.createBill(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create bill')
    }
  }
)

export const payBill = createAsyncThunk(
  'ap/payBill',
  async (billId, { rejectWithValue }) => {
    try {
      const response = await accountsPayableService.payBill(billId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to pay bill')
    }
  }
)

const initialState = {
  bills: [],
  loading: false,
  error: null,
}

const accountsPayableSlice = createSlice({
  name: 'accountsPayable',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBills.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.loading = false
        state.bills = action.payload
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createBill.pending, (state) => {
        state.loading = true
      })
      .addCase(createBill.fulfilled, (state, action) => {
        state.loading = false
        state.bills.push(action.payload)
      })
      .addCase(payBill.fulfilled, (state, action) => {
        const index = state.bills.findIndex(b => b.id === action.payload.id)
        if (index !== -1) {
          state.bills[index] = action.payload
        }
      })
  },
})

export default accountsPayableSlice.reducer
