// ** MUI Imports
import Button from '@mui/material/Button'

// ** Icons Imports
import ExportVariant from 'mdi-material-ui/ExportVariant'

// ** Custom Component Import
import Search from 'src/@core/components/common/Search'
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
        Add Invoice
      </Button>
      <Search placeholder='by invoices..' module='invoices' />
    </TableHeaderBox>
  )
}

export default TableHeader
