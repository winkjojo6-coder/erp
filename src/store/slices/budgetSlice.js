import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { budgetService } from '../../api/services'

export const fetchBudgets = createAsyncThunk(
  'budget/fetchBudgets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await budgetService.getBudgets()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch budgets')
    }
  }
)

export const createBudget = createAsyncThunk(
  'budget/createBudget',
  async (data, { rejectWithValue }) => {
    try {
      const response = await budgetService.createBudget(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create budget')
    }
  }
)

export const updateBudget = createAsyncThunk(
  'budget/updateBudget',
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      const response = await budgetService.updateBudget(id, data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update budget')
    }
  }
)

const initialState = {
  budgets: [],
  loading: false,
  error: null,
}

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.loading = false
        state.budgets = action.payload
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.budgets.push(action.payload)
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        const index = state.budgets.findIndex(b => b.id === action.payload.id)
        if (index !== -1) {
          state.budgets[index] = action.payload
        }
      })
  },
})

export default budgetSlice.reducer
