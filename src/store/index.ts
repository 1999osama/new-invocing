// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import invoices from 'src/store/apps/invoices'

export const store = configureStore({
  reducer: {
    invoices
    // Add the generated reducer as a specific top-level slice
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export interface Redux {
  // getState: typeof store.getState
  // dispatch: Dispatch<any>
}
