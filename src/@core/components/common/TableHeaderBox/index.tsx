import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

export const TableHeaderBox = styled(Box)<BoxProps>(({ theme }) => ({
  padding: 5,
  paddingBottom: 3,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 10,
  marginBottom: 5,
  [theme.breakpoints.down('lg')]: {
    justifyContent: 'flex-end'
  },
  [theme.breakpoints.down('xl')]: {
    justifyContent: 'flex-end'
  },
  [theme.breakpoints.down('md')]: {
    justifyContent: 'space-around'
  }
}))
