// ** React/Next Imports
import { useState, MouseEvent } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import { EyeOutline, ImageEdit } from 'mdi-material-ui'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useCustomers } from 'src/@core/hooks/apps/useCustomerRegistration'

const RowOptions = ({
  id,
  isEdit = true,
  isDelete = true,
  isView,
  url
}: {
  id: string
  isEdit?: boolean
  isDelete?: boolean
  isView?: string
  url?: string
}) => {
  // ** Hooks
  const { handleModal } = useToggleDrawer()

  const { store } = useCustomers(null)

  const { push } = useRouter()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = async () => {
    handleModal(id)
    handleRowOptionsClose()
  }

  const handleUpdate = () => {
    handleRowOptionsClose()
    push(`/invoices/edit/${id}`)
  }

  const handleView = () => {
    url ? push(url) : null
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        {isEdit ? (
          <MenuItem onClick={handleUpdate} disabled={store.status === 'pending'}>
            <ImageEdit fontSize='small' sx={{ mr: 2 }} />
            Edit
          </MenuItem>
        ) : null}
        {isView ? (
          <MenuItem onClick={handleView}>
            <EyeOutline fontSize='small' sx={{ mr: 2 }} />
            {isView}
          </MenuItem>
        ) : null}
        {isDelete ? (
          <MenuItem onClick={handleDelete}>
            <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        ) : null}
      </Menu>
    </>
  )
}

export default RowOptions
