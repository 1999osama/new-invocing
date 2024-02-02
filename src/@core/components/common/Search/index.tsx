import React, { useState, useCallback, SyntheticEvent } from 'react'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** MUI
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import TextField, { TextFieldProps } from '@mui/material/TextField'

// ** Icons
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'

// ** Types import
import { AppDispatch } from 'src/store'
import { fetchAllAction as invoiceFetchAllAction } from 'src/store/apps/invoices'
import { fetchAllAction as customerFetchAllAction } from 'src/store/apps/customer-register'
import { useTheme } from '@mui/material'

const Search: React.FC<{
  placeholder: string
  onSearch?: (v: string) => void
  module: 'report' | 'assignment' | 'project' | 'invoices' | 'customers'
  inputFieldStyle?: TextFieldProps['sx']
}> = ({ placeholder, module, onSearch, inputFieldStyle }) => {
  const [text, setText] = useState<string>('')
  const [status, setStatus] = useState<'idle' | 'pending' | 'success'>('idle')

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  const handleText = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setText(e.target.value)
      setStatus('idle')
    },
    [text]
  )

  const handleSearch = async (search: string) => {
    if (module === 'invoices') {
      await dispatch(invoiceFetchAllAction({ query: { search } }))
    } else if (module === 'customers') {
      await dispatch(customerFetchAllAction({ query: { search } }))
    }
  }

  const submitSearch = async (e: SyntheticEvent) => {
    e.preventDefault()
    await handleSearch(text)
    setStatus('success')
  }

  const handleSearchCancel = async () => {
    setText('')
    setStatus('idle')
    handleSearch('')
  }

  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginX: 5 }}>
      <form noValidate onSubmit={submitSearch}>
        <TextField
          value={text}
          onChange={handleText}
          placeholder={`Search ${placeholder}`}
          size='small'
          sx={{
            [theme.breakpoints.down('sm')]: {
              width: 195,
              minWidth: 20
            },
            ...inputFieldStyle
          }}
        />
        {status === 'idle' || text.length === 0 ? (
          <IconButton type='submit' color='primary'>
            <SearchIcon />
          </IconButton>
        ) : (
          <IconButton color='primary' onClick={handleSearchCancel}>
            <CancelIcon />
          </IconButton>
        )}
      </form>
    </Box>
  )
}

export default Search
