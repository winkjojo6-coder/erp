import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { loginUser, logoutUser } from '../store/slices/authSlice'

export function useAuth() {
  const dispatch = useDispatch()
  const { user, token, loading, error } = useSelector((state) => state.auth)

  const isAuthenticated = !!token && !!user

  const login = useCallback(
    (email, password) => {
      return dispatch(loginUser({ email, password }))
    },
    [dispatch]
  )

  const logout = useCallback(() => {
    return dispatch(logoutUser())
  }, [dispatch])

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
  }
}
