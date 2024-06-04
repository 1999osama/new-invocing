// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{  }}>
      <Typography sx={{ mr: 2 }}>TECHMATTER LLC DBA RCM MATTER</Typography>
      <Typography sx={{ mr: 2 , fontSize:"14px"}}>433 Walnut Ct Pittsburgh, PA 15237</Typography>
      {/* {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <Link target='_blank' href='https://themeforest.net/licenses/standard'>
            License
          </Link>
          <Link target='_blank' href='https://1.envato.market/pixinvent_portfolio'>
            More Themes
          </Link>
          <Link
            target='_blank'
            href='https://pixinvent.com/demo/materialize-mui-react-nextjs-admin-template/documentation'
          >
            Documentation
          </Link>
          <Link target='_blank' href='https://pixinvent.ticksy.com/'>
            Support
          </Link>
        </Box>
      )} */}
    </Box>
  )
}

export default FooterContent
