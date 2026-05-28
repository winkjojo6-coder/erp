import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { expenseService } from '../../api/services'

export const fetchExpenses = createAsyncThunk(
  'expense/fetchExpenses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await expenseService.getExpenses()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch expenses')
    }
  }
)

export const createExpense = createAsyncThunk(
  'expense/createExpense',
  async (data, { rejectWithValue }) => {
    try {
      const response = await expenseService.createExpense(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create expense')
    }
  }
)

export const approveExpense = createAsyncThunk(
  'expense/approveExpense',
  async (expenseId, { rejectWithValue }) => {
    try {
      const response = await expenseService.approveExpense(expenseId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to approve expense')
    }
  }
)

const initialState = {
  expenses: [],
  loading: false,
  error: null,
}

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false
        state.expenses = action.payload
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload)
      })
      .addCase(approveExpense.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(e => e.id === action.payload.id)
        if (index !== -1) {
          state.expenses[index] = action.payload
        }
      })
  },
})

export default expenseSlice.reducer
