import * as React from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'

// Modular Form Import
import Form from 'src/@core/components/apps/invoices/components/Form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Common Components Imports
import { DrawerHeader } from 'src/@core/components/common/DrawerHeader'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  serviceId: string | null
}

const InvoiceDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, serviceId } = props

  const handleClose = () => {
    // reset()
    toggle()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: false }}
      sx={{ '& .MuiDrawer-paper': { width: 700 } }}
    >
      <DrawerHeader>
        <Typography variant='h6'>{!serviceId ? 'Add Invoice' : 'Update Invoice'}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </DrawerHeader>
      <Form serviceId={serviceId} />
    </Drawer>
  )
}

export default InvoiceDrawer
