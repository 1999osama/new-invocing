// ** React Import
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { Tooltip, styled } from '@mui/material'

// ** Store Imports
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'

// ** Types Imports
import { IInvoice } from 'src/types/apps/invoices'

// ** Custom Components
import { CreatedAtCell } from 'src/@core/components/tables'
import RenderClient from 'src/@core/components/common/RenderClient'
import RowOptions from './RowOptions'

interface CellType {
  row: IInvoice
}

// ** Styled component for the link in the dataTable
const StyledLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const columns = [
  {
    flex: 0.1,
    minWidth: 120,
    field: 'invoiceNo',
    sortable: false,
    headerName: 'Invoice No',
    renderCell: ({ row }: CellType) => {
      return <StyledLink>{`#${row.id}`}</StyledLink>
    }
  },
  // {
  //   flex: 0.2,
  //   minWidth: 150,
  //   field: 'client',
  //   sortable: false,
  //   headerName: 'Client',
  //   renderCell: ({ row }: CellType) => {
  //     return (
  //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //         <RenderClient
  //           imageUrl={row.user?.profilePicture || ''}
  //           name={`${row.user?.firstName} ${row.user?.lastName}`}
  //           variant='circular'
  //         />
  //         <Box display='flex' flexDirection={'column'}>
  //           <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
  //             {`${row.user?.firstName} ${row.user?.lastName}`}
  //           </Typography>
  //           <Typography noWrap component='a' variant='caption' sx={{ color: 'text.secondary', textDecoration: 'none' }}>
  //             {`${row.user?.email}`}
  //           </Typography>
  //         </Box>
  //       </Box>
  //     )
  //   }
  // },
  {
    flex: 0.2,
    minWidth: 230,
    field: 'vendor',
    sortable: false,
    headerName: 'Vendor',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <RenderClient imageUrl={''} name={`${row.vendor?.name}`} variant='circular' />
          <Box display='flex' flexDirection={'column'}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {`${row.vendor?.merchantName}`}
            </Typography>
            <Typography noWrap component='a' variant='caption' sx={{ color: 'text.secondary', textDecoration: 'none' }}>
              {`${row.vendor?.email}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 180,
    field: 'bankName',
    sortable: false,
    headerName: 'Bank Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row?.vendor?.bankName}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 190,
    field: 'accountTitle',
    sortable: false,
    headerName: 'Account Title',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row?.vendor?.accountTitle}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 150,
    sortable: false,
    field: 'issuedDate',
    headerName: 'Issued Date',
    renderCell: ({ row }: CellType) => <CreatedAtCell createdAt={row.createdAt || null} />
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <RowOptions id={row.id || ''} isView='View' url={`/invoices/${row.id}`} />
  }
]

const Table = () => {
  // ** Hooks
  const store = useSelector((state: RootState) => state.invoices)
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
