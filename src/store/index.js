// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import organization from 'src/store/basic-data/organization'

export const store = configureStore({
  reducer: {
    organization,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
