// ** Redux Imports
import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'src/store'

// ** Toast
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { InvoiceService } from 'src/services'

// ** Types Imports
import { GetParams } from 'src/types/api'
import { InvoiceApi, InvoiceForm } from 'src/types/apps/invoices'

// ** Initial State Of Slice

interface InitialState {
  entities: InvoiceApi[] | []
  entity: InvoiceApi | {}
  params: GetParams
  status: 'pending' | 'error' | 'success' | 'idle'
}

// Api Error
const ApiError = (error: any, dispatch: AppDispatch, rejectWithValue: (reason: string) => void) => {
  dispatch(InvoiceSlice.actions.handleStatus('error'))
  toast.error(error?.response ? error.response.data.message : 'Something Went Wrong')
  return rejectWithValue(error.response.data.message || 'Something Went Wrong')
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: Dispatch<any>
}>()

// ** Fetch One
export const fetchOneAction = createAppAsyncThunk(
  'invoice/fetchOne',
  async ({ id }: { id: string }, { getState, dispatch, rejectWithValue }) => {
    dispatch(InvoiceSlice.actions.handleStatus('pending'))
    try {
      const response = await InvoiceService.getById(id)
      dispatch(InvoiceSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Fetch All
export const fetchAllAction = createAppAsyncThunk(
  'invoice/fetchAll',
  async (params: GetParams, { getState, dispatch, rejectWithValue }) => {
    dispatch(InvoiceSlice.actions.handleStatus('pending'))
    try {
      dispatch(InvoiceSlice.actions.handleQuery(params.query))
      const query = getState().invoices.params.query
      // query && (query.limit = `${params.pagination?.limit}` || "10")
      // query && (query.page = `${params.pagination?.page}` || "1")
      // dispatch(InvoiceSlice.actions.handleQuery({ query }))
      const response = await InvoiceService.getAll({ query })
      dispatch(InvoiceSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Add
export const addAction = createAppAsyncThunk(
  'invoice/add',
  async ({ data }: { data: InvoiceForm }, { getState, dispatch, rejectWithValue }) => {
    dispatch(InvoiceSlice.actions.handleStatus('pending'))
    try {
      const response = await InvoiceService.add(data)
      // const query = getState().invoices.params.query
      // dispatch(fetchAllAction({ query }))
      toast.success('Added successfully!')
      dispatch(InvoiceSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Update
export const updateAction = createAppAsyncThunk(
  'invoice/update',
  async ({ id, data }: { id: string; data: InvoiceForm }, { getState, dispatch, rejectWithValue }) => {
    dispatch(InvoiceSlice.actions.handleStatus('pending'))
    try {
      const response = await InvoiceService.update(id, data)
      // const query = getState().invoices.params.query
      // dispatch(fetchAllAction({ query }))
      toast.success('updated successfully!')
      dispatch(InvoiceSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Delete
export const deleteAction = createAppAsyncThunk(
  'invoice/delete',
  async ({ id }: { id: string }, { getState, dispatch, rejectWithValue }) => {
    dispatch(InvoiceSlice.actions.handleStatus('pending'))
    try {
      const response = await InvoiceService.delete(id)
      // const query = getState().invoices.params.query
      // dispatch(fetchAllAction({ query }))
      toast.success('deleted successfully!')
      dispatch(InvoiceSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const InvoiceSlice = createSlice({
  name: 'invoices',
  initialState: {
    entities: [],
    entity: {},
    params: {}
  } as InitialState,
  reducers: {
    handleStatus: (state, action) => {
      state.status = action.payload
    },
    handleQuery: (state, action) => {
      const prev_query = state.params.query || {}
      state.params.query = { ...prev_query, ...action.payload }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAllAction.fulfilled, (state, action) => {
      const { data } = action.payload
      const modifiedArr = data.entities?.map((item: any) => {
        const { _id, ...rest } = item
        return {
          id: _id,
          ...rest
        }
      })
      state.entities = modifiedArr || []
      state.params.pagination = data?.pagination
    })
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      const modifiedObject = (() => {
        const { _id, ...rest } = data?.entity
        return { id: _id, ...rest }
      })()
      state.entity = modifiedObject
    })
    builder.addCase(addAction.fulfilled, (state, action) => {
      const { data } = action.payload
      const modifiedObject = (() => {
        const { _id, ...rest } = data?.entity
        return { id: _id, ...rest }
      })()
      state.entities = [modifiedObject, ...state.entities]
    })
    builder.addCase(updateAction.fulfilled, (state, action) => {
      const { data } = action.payload
      const modifiedObject = (() => {
        const { _id, ...rest } = data?.entity
        return { id: _id, ...rest }
      })()
      const cloneArr = [...state.entities]
      const index = cloneArr.findIndex(ele => ele.id === modifiedObject.id)
      cloneArr.splice(index, 1, modifiedObject)
      state.entities = cloneArr
    })
    builder.addCase(deleteAction.fulfilled, (state, action) => {
      const { data } = action.payload
      const modifiedObject = (() => {
        const { _id, ...rest } = data?.entity
        return { id: _id, ...rest }
      })()
      state.entities = state.entities.filter(ele => ele.id !== modifiedObject.id)
    })
  }
})

export default InvoiceSlice.reducer
