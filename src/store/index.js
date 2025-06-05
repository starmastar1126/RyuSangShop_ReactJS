// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import organization from 'src/store/basic/organization'

export const store = configureStore({
  reducer: {
    organization,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
