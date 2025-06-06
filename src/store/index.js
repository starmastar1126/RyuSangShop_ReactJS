// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import organization from 'src/store/basic/organization'
import client from 'src/store/basic/client'
import category from 'src/store/basic/category'
import product from 'src/store/basic/product'
import spot from 'src/store/basic/spot'
import unit from 'src/store/basic/unit'

export const store = configureStore({
  reducer: {
    organization,
    client,
    category,
    product,
    spot,
    unit,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
