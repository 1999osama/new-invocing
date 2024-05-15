// ** Redux Imports
import { createAsyncThunk, createSlice, Dispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'src/store'

// ** Toast
import toast from 'react-hot-toast'

// ** Employee Service Imports
import { InvoiceService } from 'src/services'

// ** Types Imports
import { GetParams } from 'src/types/api'
import { IInvoice, InvoiceApi, InvoiceForm } from 'src/types/apps/invoices'

// ** Initial State Of Slice

interface InitialState {
  entities: InvoiceApi[] | []
  entity: {
    charges?: [
      {
        description?: string
        chargeType?: any
        amount?: any
        price?: any
        total?: any
      }
    ]
    creditCardTax?: string | number
    balance_credit? : number | string
    subTotal?: string | number
  }
  params: GetParams
  total: number
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
    },
    handleEmptyEntity: state => {
      state.entity = {}
    },
    handleEmptyEntities: state => {
      state.entities = []
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAllAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entities = data || []
      // state.params.pagination = data?.pagination
      state.total = data?.length || 0
    })
    builder.addCase(fetchOneAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entity = data
    })
    builder.addCase(addAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entities = [data, ...state.entities]
    })
    builder.addCase(deleteAction.fulfilled, (state, action) => {
      const { data } = action.payload
      state.entities = state.entities.filter(ele => ele.id !== data.id)
    })
  }
})

export default InvoiceSlice.reducer
