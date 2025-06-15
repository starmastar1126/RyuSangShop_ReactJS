import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import toast from 'react-hot-toast'

// ** Config
import { Http } from 'src/configs/http'
import urls from 'src/configs/urls'
import utils from 'src/configs/utils'

// ** Fetch Products
export const fetchProduct = createAsyncThunk('product/fetchData', async (params, thunkAPI) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem(urls.access)}`
  }

  try {
    let url = utils.toURL({
      url: urls.product,
      query: params
    })

    let response = await Http.get(url, header)
    const { status, data } = response
    if (status === 200) {
      return data.data
    } else if (status === 204) {
      return { items: [], total: 0 }
    } else {
      return thunkAPI.rejectWithValue()
    }
  } catch (error) {
    return thunkAPI.rejectWithValue()
  }
})

export const addProduct = createAsyncThunk('product/addData', async (params, thunkAPI) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem(urls.access)}`
  }

  try {
    let url = utils.toURL({
      url: urls.product,
      query: params
    })

    let response = await Http.post(url, params, header)
    const { status, data } = response
    if (status === 200 || status === 201) {
      toast.success('Successfully added!')
      return data.data
    } else {
      toast.error('Failure adding.')
      return thunkAPI.rejectWithValue()
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast.error('Already exist.')
    } else {
      toast.error(error.message)
    }
    return thunkAPI.rejectWithValue()
  }
})

export const editProduct = createAsyncThunk('product/editData', async (params, thunkAPI) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem(urls.access)}`
  }

  try {
    let url = utils.toURL({
      url: urls.product,
      query: params
    })

    let response = await Http.put(url, params, header)
    const { status, data } = response
    if (status === 200) {
      toast.success('Successfully saved!')
      return data.data
    } else {
      toast.error('Failure saving.')
      return thunkAPI.rejectWithValue()
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast.error('Already exist.')
    } else {
      toast.error(error.message)
    }
    return thunkAPI.rejectWithValue()
  }
})

export const deleteProduct = createAsyncThunk('product/deleteData', async (params, thunkAPI) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem(urls.access)}`
  }

  try {
    let url = utils.toURL({
      url: urls.product,
      query: params
    })

    let response = await Http.delete(url, header)
    const { status, data } = response
    if (status === 200) {
      toast.success('Successfully deleted!')
      return data.data
    } else if (status === 204) {
      toast.success('Successfully deleted!')
      return { items: [], total: 0 }
    } else {
      toast.error('Failure deleting.')
      return thunkAPI.rejectWithValue()
    }
  } catch (error) {
    return thunkAPI.rejectWithValue()
  }
})

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],
    total: 0
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.data = action.payload?.items
        state.total = action.payload?.total
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.data = action.payload?.items
        state.total = action.payload?.total
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.data = action.payload?.items
        state.total = action.payload?.total
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = action.payload?.items
        state.total = action.payload?.total
      })
  }
})

export default productSlice.reducer
