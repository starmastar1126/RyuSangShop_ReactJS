import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Fetch Organizations
export const fetchData = createAsyncThunk('organization/fetchData', async params => {
  const response = await axios.get('/basic-data/organization/list', {
    params
  })

  return response.data
})

// ** Add Organization
export const addOrganization = createAsyncThunk('organization/addOrganization', async (data, { getState, dispatch }) => {
  const response = await axios.post('/basic-data/organization/add', {
    data
  })
  dispatch(fetchData(getState().organization.params))

  return response.data
})

// ** Delete Organization
export const deleteOrganization = createAsyncThunk('organization/deleteOrganization', async (id, { getState, dispatch }) => {
  const response = await axios.delete('/basic-data/organization/delete', {
    data: id
  })
  dispatch(fetchData(getState().organization.params))

  return response.data
})

export const organizationSlice = createSlice({
  name: 'organization',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.organizations
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default organizationSlice.reducer
