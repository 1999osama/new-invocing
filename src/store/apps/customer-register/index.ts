// ** Redux Imports
import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'src/store'

// ** Toast
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { customerRegisterService } from 'src/services'

// ** Types Imports
import { GetParams } from 'src/types/api'
import { ICustomerRegisterApi, ICustomerRegisterForm, ICustomerRegister } from 'src/types/apps/customer-register'

// ** Initial State Of Slice

interface InitialState {
  entities: ICustomerRegisterApi[] | []
  entity: ICustomerRegisterApi | {}
  params: GetParams
  total: number
  status: 'pending' | 'error' | 'success' | 'idle'
}

// Api Error
const ApiError = (error: any, dispatch: AppDispatch, rejectWithValue: (reason: string) => void) => {
  dispatch(CustomerRegisterSlice.actions.handleStatus('error'))
  toast.error(error?.response ? error.response.data.message : 'Something Went Wrong')
  return rejectWithValue(error.response.data.message || 'Something Went Wrong')
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: Dispatch<any>
}>()

// ** Fetch One
export const fetchOneAction = createAppAsyncThunk(
  'customer-register/fetchOne',
  async ({ id }: { id: string | string[] }, { getState, dispatch, rejectWithValue }) => {
    dispatch(CustomerRegisterSlice.actions.handleStatus('pending'))
    try {
      const response = await customerRegisterService.getById(id as string)
      dispatch(CustomerRegisterSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Fetch All
export const fetchAllAction = createAppAsyncThunk(
  'customer-register/fetchAll',
  async (params: GetParams, { getState, dispatch, rejectWithValue }) => {
    dispatch(CustomerRegisterSlice.actions.handleStatus('pending'))
    try {
      dispatch(CustomerRegisterSlice.actions.handleQuery(params.query))
      const query = getState().customerRegister.params.query
      // query && (query.limit = `${params.pagination?.limit}` || "10")
      // query && (query.page = `${params.pagination?.page}` || "1")
      // dispatch(CustomerRegisterSlice.actions.handleQuery({ query }))
      const response = await customerRegisterService.getAll({ query })
      dispatch(CustomerRegisterSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Add
export const addAction = createAppAsyncThunk(
  'customer-register/add',
  async ({ data }: { data: ICustomerRegisterForm }, { getState, dispatch, rejectWithValue }) => {
    dispatch(CustomerRegisterSlice.actions.handleStatus('pending'))
    try {
      const response = await customerRegisterService.add(data)
      // const query = getState().invoices.params.query
      // dispatch(fetchAllAction({ query }))
      toast.success('Added successfully!')
      dispatch(CustomerRegisterSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Update
export const updateAction = createAppAsyncThunk(
  'customer-register/update',
  async ({ id, data }: { id: string; data: ICustomerRegisterForm }, { getState, dispatch, rejectWithValue }) => {
    dispatch(CustomerRegisterSlice.actions.handleStatus('pending'))
    try {
      const response = await customerRegisterService.update(id, data)
      // const query = getState().invoices.params.query
      // dispatch(fetchAllAction({ query }))
      toast.success('updated successfully!')
      dispatch(CustomerRegisterSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

// ** Delete
export const deleteAction = createAppAsyncThunk(
  'customer-register/delete',
  async ({ id }: { id: string }, { getState, dispatch, rejectWithValue }) => {
    dispatch(CustomerRegisterSlice.actions.handleStatus('pending'))
    try {
      const response = await customerRegisterService.delete(id)
      // const query = getState().invoices.params.query
      // dispatch(fetchAllAction({ query }))
      toast.success('deleted successfully!')
      dispatch(CustomerRegisterSlice.actions.handleStatus('success'))
      return response.data
    } catch (error: any) {
      return ApiError(error, dispatch, rejectWithValue)
    }
  }
)

export const CustomerRegisterSlice = createSlice({
  name: 'customer-register',
  initialState: {
    entities: [],
    entity: {},
    params: {},
    total: 0
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
      state.entities = data || []
      state.total = data?.length || 0
    })
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entity = data
    })
    builder.addCase(addAction.fulfilled, (state, action) => {
      const { data } = action.payload
    })
    builder.addCase(updateAction.fulfilled, (state, action) => {
      const { data } = action.payload
    })
    builder.addCase(deleteAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entities = state.entities.filter(ele => ele.id !== data.id)
    })
  }
})

export default CustomerRegisterSlice.reducer
