// ** React/Next Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

// ** Custom Components Import
import { CreatedAtCell } from 'src/@core/components/tables'
import RowOptions from './RowOptions'

// ** Store Imports
import { useSelector } from 'react-redux'

// ** Types Imports
import { ICustomerRegister } from 'src/types/apps/customer-register'

// ** Store Imports
import { RootState } from 'src/store'

interface CellType {
  row: ICustomerRegister
}

const columns = [
  {
    flex: 0.1,
    minWidth: 200,
    field: 'name',
    sortable: false,
    headerName: 'Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box display='flex' flexDirection={'column'}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {`${row.name}`}
            </Typography>
            <Typography noWrap component='a' variant='caption' sx={{ color: 'text.secondary', textDecoration: 'none' }}>
              {`${row.email}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 180,
    field: 'vendor',
    sortable: false,
    headerName: 'Vendor',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
            {`${row.vendor}`}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 180,
    field: 'merchantName1',
    sortable: false,
    headerName: 'Merchant Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
            {`${row.merchantName1}`}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 170,
    field: 'bankName',
    sortable: false,
    headerName: 'Bank Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.bankName}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 180,
    sortable: false,
    field: 'title',
    headerName: 'Title',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.title}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    sortable: false,
    minWidth: 150,
    field: 'createdAt',
    headerName: 'Created At',
    renderCell: ({ row }: CellType) => <CreatedAtCell createdAt={row.createdAt || null} />
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <RowOptions id={row.id || ''} />
  }
]

const Table = () => {
  // ** Hooks
  const store = useSelector((state: RootState) => state.customerRegister)

  const [pageSize, setPageSize] = useState<number>(10)

  return (
    <DataGrid
      autoHeight
      rows={store?.entities || []}
      columns={columns}
      loading={store.status === 'pending'}
      pageSize={pageSize}
      disableColumnMenu
      disableSelectionOnClick
      rowsPerPageOptions={[3, 5, 10, 25, 50]}
      sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
      onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
    />
  )
}

export default Table
