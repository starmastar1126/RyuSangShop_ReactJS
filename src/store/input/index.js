import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import toast from 'react-hot-toast'
import format from 'date-fns/format'

// ** Config
import { Http } from 'src/configs/http'
import urls from 'src/configs/urls'
import utils from 'src/configs/utils'

// ** Fetch Inputs
export const fetchInput = createAsyncThunk('input/fetchData', async (params, thunkAPI) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem(urls.access)}`
  }

  try {
    let url = utils.toURL({
      url: urls.input,
      query: {
        fromDate: format(params.fromDate, 'yyyy-MM-dd'),
        toDate: format(params.toDate, 'yyyy-MM-dd'),
        search: params.search
      }
    })
    let response = await Http.get(url, header)
    const { status, data } = response
    if (status === 200) {
      return data.data
    } else {
      return thunkAPI.rejectWithValue()
    }
  } catch (error) {
    return thunkAPI.rejectWithValue()
  }
})

export const addInput = createAsyncThunk('input/addData', async (params, thunkAPI) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem(urls.access)}`
  }

  try {
    let url = utils.toURL({
      url: urls.input,
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

export const editInput = createAsyncThunk('input/editData', async (params, thunkAPI) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem(urls.access)}`
  }

  try {
    let url = utils.toURL({
      url: urls.input,
      query: {
        id: params.id,
        fromDate: format(params.fromDate, 'yyyy-MM-dd'),
        toDate: format(params.toDate, 'yyyy-MM-dd'),
        search: params.search
      }
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

export const deleteInput = createAsyncThunk('input/deleteData', async (params, thunkAPI) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem(urls.access)}`
  }

  try {
    let url = utils.toURL({
      url: urls.input,
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

export const inputSlice = createSlice({
  name: 'input',
  initialState: {
    data: [],
    total: 0
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchInput.fulfilled, (state, action) => {
        state.data = action.payload?.items
        state.total = action.payload?.total
      })
      .addCase(addInput.fulfilled, (state, action) => {
        state.data = action.payload?.items
        state.total = action.payload?.total
      })
      .addCase(editInput.fulfilled, (state, action) => {
        state.data = action.payload?.items
        state.total = action.payload?.total
      })
      .addCase(deleteInput.fulfilled, (state, action) => {
        state.data = action.payload?.items
        state.total = action.payload?.total
      })
  }
})

export default inputSlice.reducer
