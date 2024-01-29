// ** React Import
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { Tooltip } from '@mui/material'

// ** Store Imports
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

// ** Types Imports
import { IInvoice } from 'src/types/apps/invoices'

// ** Custom Components
import { RowOptions, CreatedAtCell } from 'src/@core/components/tables'
import RenderClient from 'src/@core/components/common/RenderClient'

interface CellType {
  row: IInvoice
}

const columns = [
  {
    flex: 0.1,
    minWidth: 100,
    field: 'invoiceNo',
    sortable: false,
    headerName: 'Invoice No',
    renderCell: ({ row }: CellType) => {
      return (
        <Tooltip title='Click to view'>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              {/* <RenderClient imageUrl={row.image} name={row.name} /> */}
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                #{row.invoiceNo}
              </Typography>
            </Box>
          </Box>
        </Tooltip>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'client',
    sortable: false,
    headerName: 'Client',
    renderCell: ({ row }: CellType) => {
      return (
        <Tooltip title='Click to view'>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <RenderClient
              imageUrl={row.user?.profilePicture || ''}
              name={`${row.user?.firstName} ${row.user?.lastName}`}
              variant='circular'
            />
            <Box display='flex' flexDirection={'column'}>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {`${row.user?.firstName} ${row.user?.lastName}`}
              </Typography>
              <Typography
                noWrap
                component='a'
                variant='caption'
                sx={{ color: 'text.secondary', textDecoration: 'none' }}
              >
                {`${row.user?.email}`}
              </Typography>
            </Box>
          </Box>
        </Tooltip>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 50,
    field: 'total',
    sortable: false,
    headerName: 'Total',
    renderCell: ({ row }: CellType) => {
      return (
        <Tooltip title='Click to view'>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                ${row.total || 0}
              </Typography>
            </Box>
          </Box>
        </Tooltip>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 50,
    sortable: false,
    field: 'balance',
    headerName: 'Balance',
    renderCell: ({ row }: CellType) => {
      return (
        <Tooltip title='Click to view'>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                ${row.balance || 0}
              </Typography>
            </Box>
          </Box>
        </Tooltip>
      )
    }
  },
  {
    flex: 0.1,
    sortable: false,
    field: 'issuedDate',
    headerName: 'Issued Date',
    renderCell: ({ row }: CellType) => <CreatedAtCell createdAt={row.issuedDate} />
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <RowOptions id={row.id || ''} isView='View' url={`/invoices/${row.id}`} />
  }
]

const Table = () => {
  // ** Hooks
  const store = useSelector((state: RootState) => state.invoices)
  const [pageSize, setPageSize] = useState<number>(5)

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
