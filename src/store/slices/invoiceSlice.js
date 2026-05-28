import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { invoiceService } from '../../api/services'

export const fetchInvoices = createAsyncThunk(
  'invoice/fetchInvoices',
  async (params, { rejectWithValue }) => {
    try {
      const response = await invoiceService.getInvoices(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const createInvoice = createAsyncThunk(
  'invoice/createInvoice',
  async (data, { rejectWithValue }) => {
    try {
      const response = await invoiceService.createInvoice(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const updateInvoice = createAsyncThunk(
  'invoice/updateInvoice',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await invoiceService.updateInvoice(id, data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const deleteInvoice = createAsyncThunk(
  'invoice/deleteInvoice',
  async (id, { rejectWithValue }) => {
    try {
      await invoiceService.deleteInvoice(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data)
    }
  }
)

const initialState = {
  list: [],
  detail: null,
  loading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 },
}

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    resetDetail: (state) => {
      state.detail = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Invoices
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.data || []
        state.pagination = action.payload.pagination || {}
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create Invoice
      .addCase(createInvoice.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.loading = false
        state.list.unshift(action.payload)
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update Invoice
      .addCase(updateInvoice.fulfilled, (state, action) => {
        const index = state.list.findIndex((inv) => inv.id === action.payload.id)
        if (index !== -1) {
          state.list[index] = action.payload
        }
      })
      // Delete Invoice
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.list = state.list.filter((inv) => inv.id !== action.payload)
      })
  },
})

export const { clearError, resetDetail } = invoiceSlice.actions
export default invoiceSlice.reducer
