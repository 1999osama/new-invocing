// ** MUI Imports
import Box from '@mui/material/Box'
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

interface CellType {
  row: IInvoice
}

const columns = [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            {/* <RenderClient imageUrl={row.image} name={row.name} /> */}
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.name}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'description',
    headerName: 'description',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {row.description}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  // {
  //   flex: 0.1,
  //   minWidth: 50,
  //   field: 'order',
  //   headerName: 'order',
  //   renderCell: ({ row }: CellType) => {
  //     return (
  //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //         <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer' }}>
  //           <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
  //             {row.order || 0}
  //           </Typography>
  //         </Box>
  //       </Box>
  //     )
  //   }
  // },
  // {
  //   flex: 0.1,
  //   minWidth: 110,
  //   field: 'status',
  //   headerName: 'Status',
  //   renderCell: ({ row }: CellType) => {
  //     return (
  //       <CustomChip
  //         skin='light'
  //         size='small'
  //         label={row.status}
  //         color={row.status === 'PUBLIC' ? 'success' : 'error'}
  //         sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
  //       />
  //     )
  //   }
  // },
  // {
  //   flex: 0.1,
  //   field: 'createdAt',
  //   headerName: 'Created At',
  //   renderCell: ({ row }: CellType) => {
  //     return <CreatedAtCell createdAt={row.createdAt} />
  //   }
  // },
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
    />
    // <DataGrid
    //   rows={store.entities}
    //   columns={columns}
    //   loading={store.status === 'pending'}
    //   pageSize={pageSize}
    //   disableSelectionOnClick
    //   rowsPerPageOptions={[10, 25, 50]}
    //   sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
    //   onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
    // />
    // <DataGrid
    //   rows={store.entities}
    //   columns={columns}
    //   loading={store.status === 'pending'}
    //   paginationModel={store.params.pagination}
    //   onPageSizeChange={newPageSize => dispatch(fetchAllAction({ query: { limit: `${newPageSize}` } }))}
    //   onPageChange={newPage => dispatch(fetchAllAction({ query: { page: `${newPage + 1}` } }))}
    // />
  )
}

export default Table
