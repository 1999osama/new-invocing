// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { RowOptions, CreatedAtCell } from 'src/@core/components/tables'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { IInvoice } from 'src/types/apps/invoices'
import RenderClient from 'src/@core/components/common/RenderClient'
import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import { Tooltip, styled } from '@mui/material'

interface CellType {
  row: IInvoice
}

const columns = [
  {
    flex: 0.1,
    minWidth: 100,
    field: 'invoiceNo',
    headerName: 'Invoice No',
    renderCell: ({ row }: CellType) => {
      return (
        <Tooltip title='Click to view'>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
    headerName: 'Client',
    renderCell: ({ row }: CellType) => {
      return (
        <Tooltip title='Click to view'>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RenderClient
              imageUrl={row.user?.profilePicture || ''}
              name={`${row.user?.first_name} ${row.user?.last_name}`}
              variant='circular'
            />
            <Box display='flex' flexDirection={'column'}>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {`${row.user?.first_name} ${row.user?.last_name}`}
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
    headerName: 'Total',
    renderCell: ({ row }: CellType) => {
      return (
        <Tooltip title='Click to view'>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
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
    field: 'issuedDate',
    headerName: 'Issued Date',
    renderCell: ({ row }: CellType) => {
      return (
        <Tooltip title='Click to view'>
          <CreatedAtCell createdAt={row.issuedDate} />
        </Tooltip>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 50,
    field: 'balance',
    headerName: 'Balance',
    renderCell: ({ row }: CellType) => {
      return (
        <Tooltip title='Click to view'>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
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
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <RowOptions id={row.id || ''} />
  }
]

const Table = () => {
  // ** Hooks
  const store = useSelector((state: RootState) => state.invoices)
  const [pageSize, setPageSize] = useState<number>(5)

  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()

  return (
    <DataGrid
      autoHeight
      rows={store?.entities || []}
      columns={columns}
      loading={store.status === 'pending'}
      pageSize={pageSize}
      disableSelectionOnClick
      rowsPerPageOptions={[3, 5, 10, 25, 50]}
      sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
      onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
      onCellClick={params => {
        if (params.field !== 'actions') {
          router.push(`/invoices/${params.id}`)
        }
      }}
    />
  )
}

export default Table
