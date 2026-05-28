import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  sidebarOpen: true,
  notifications: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload)
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        ...action.payload,
      }
      state.notifications.push(notification)
      setTimeout(() => {
        state.notifications = state.notifications.filter(n => n.id !== notification.id)
      }, 3000)
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
  },
})

export const { setTheme, toggleSidebar, addNotification, removeNotification } = uiSlice.actions
export default uiSlice.reducer
