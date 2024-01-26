// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

// ** Types
import { BlankLayoutProps } from './types'
import { Fragment, useEffect, useState } from 'react'
import useDeviceDetection from '../hooks/useDeviceDetection'

// Styled component for Blank Layout component
// const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
//   height: '100vh',

//   // For V1 Blank layout pages
//   '& .content-center': {
//     display: 'flex',
//     minHeight: '100vh',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: theme.spacing(5)
//   },

//   // For V2 Blank layout pages
//   '& .content-right': {
//     display: 'flex',
//     minHeight: '100vh',
//     overflowX: 'hidden',
//     position: 'relative'
//   }
// }))

const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

const BlankLayout = ({ children }: BlankLayoutProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const device = useDeviceDetection()

  const updateCursorPosition = (e: any) => {
    setCursorPosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    document.addEventListener('mousemove', e => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      })
    })

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition)
    }
  }, [])

  const CircleOnCursor = styled(Box)<BoxProps>(
    ({
      theme: {
        palette: {
          customColors: { tooltipBg }
        }
      }
    }) => ({
      position: 'fixed',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: `2px solid ${tooltipBg}`,
      top: `${cursorPosition.y}px`,
      left: `${cursorPosition.x - 10}px`,
      transition: 'top 0.3s ease-in-out, left 0.3s ease-in-out',
      pointerEvents: 'none',
      zIndex: 9999999999
    })
  )

  return (
    <Fragment>
      {device === 'Desktop' && <CircleOnCursor />}
      <BlankLayoutWrapper className='layout-wrapper'>
        <Box className='app-content' sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
          {children}
        </Box>
      </BlankLayoutWrapper>
    </Fragment>
  )
}

export default BlankLayout
