import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import toast from 'react-hot-toast'

// ** Config
import { Http } from 'src/configs/http'
import urls from 'src/configs/urls'
import utils from 'src/configs/utils'

// ** Fetch Organizations
export const fetchOrganization = createAsyncThunk('organization/fetchData', async (params, thunkAPI) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem(urls.access)}`
  }

  try {
    let url = utils.toURL({
      url: urls.organization,
      query: params
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

export const addOrganization = createAsyncThunk('organization/addData', async (params, thunkAPI) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem(urls.access)}`
  }

  try {
    let url = utils.toURL({
      url: urls.organization,
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

export const editOrganization = createAsyncThunk('organization/editData', async (params, thunkAPI) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem(urls.access)}`
  }

  try {
    let url = utils.toURL({
      url: urls.organization,
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

export const deleteOrganization = createAsyncThunk('organization/deleteData', async (params, thunkAPI) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.localStorage.getItem(urls.access)}`
  }

  try {
    let url = utils.toURL({
      url: urls.organization,
      query: params
    })

    let response = await Http.delete(url, header)
    const { status, data } = response
    if (status === 200) {
      toast.success('Successfully deleted!')
      return data.data
    } else {
      toast.error('Failure deleting.')
      return thunkAPI.rejectWithValue()
    }
  } catch (error) {
    return thunkAPI.rejectWithValue()
  }
})

export const organizationSlice = createSlice({
  name: 'organization',
  initialState: {
    data: [],
    total: 0
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrganization.fulfilled, (state, action) => {
        state.data = action.payload?.items
        state.total = action.payload?.total
      })
      .addCase(addOrganization.fulfilled, (state, action) => {
        state.data = action.payload?.items
        state.total = action.payload?.total
      })
      .addCase(editOrganization.fulfilled, (state, action) => {
        state.data = action.payload?.items
        state.total = action.payload?.total
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.data = action.payload?.items
        state.total = action.payload?.total
      })
  }
})

export default organizationSlice.reducer
