import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import itemsReducer from './itemsSlice'
import usersReducer from './usersSlice'
import { apiSlice } from './apiSlice'
import { socketSlice } from './socketSlice'

const persistanceLocalStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  next(action)
  window.localStorage.setItem('session_state', JSON.stringify(store.getState()))
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
    users: usersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [socketSlice.reducerPath]: socketSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(socketSlice.middleware)
      .concat(persistanceLocalStorageMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch