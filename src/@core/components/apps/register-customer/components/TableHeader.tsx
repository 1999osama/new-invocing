// ** MUI Imports
import Button from '@mui/material/Button'

// ** Icons Imports
import ExportVariant from 'mdi-material-ui/ExportVariant'
import Search from 'src/@core/components/common/Search'

// ** Components Import
import { TableHeaderBox } from 'src/@core/components/common/TableHeaderBox'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
  exportTable: () => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { toggle, exportTable } = props

  return (
    <TableHeaderBox>
      <Button
        sx={{ mr: 4, mb: 2 }}
        color='secondary'
        variant='outlined'
        startIcon={<ExportVariant fontSize='small' />}
        onClick={exportTable}
      >
        Export
      </Button>
      <Button sx={{ mr: 4 }} onClick={toggle} variant='contained'>
        Add Customer
      </Button>
      <Search placeholder='by customer..' module='customers' />
    </TableHeaderBox>
  )
}

export default TableHeader
