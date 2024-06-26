// ** React Imports
import { useRef, useState } from 'react'
import { useRouter } from 'next/router'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'

// ** Third Party Imports
import { format, formatDistanceToNow } from 'date-fns'
// import ReactToPdf from 'react-to-pdf'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import Image from 'next/image'
// ** Types
import { SingleInvoiceType } from 'src/types/apps/invoiceTypes'
import { IInvoice } from 'src/types/apps/invoices'
import { EyeOutline, Printer } from 'mdi-material-ui'

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const PreviewCard = ({ data }: { data: IInvoice }) => {
  // ** Hook
  const theme = useTheme()

  // ** Ref
  const PreviewRef = useRef(null)

  const { pathname } = useRouter()

  const [isPrinting, setIsPrinting] = useState<boolean>(false)

  return (
    <Card sx={{ width: '100%' }}>
      <Box ref={PreviewRef}>
        <CardContent>
          <Grid container>
            <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 6 }}>
                  <Image src={'/images/rcmLogo.png'} width={200} height={60} alt='logo' />
                  {/* <svg width={40} fill='none' height={22} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
                    <rect
                      rx='25.1443'
                      width='50.2886'
                      height='143.953'
                      fill={theme.palette.primary.main}
                      transform='matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)'
                    />
                    <rect
                      rx='25.1443'
                      width='50.2886'
                      height='143.953'
                      fillOpacity='0.4'
                      fill='url(#paint0_linear_7821_79167)'
                      transform='matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)'
                    />
                    <rect
                      rx='25.1443'
                      width='50.2886'
                      height='143.953'
                      fill={theme.palette.primary.main}
                      transform='matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)'
                    />
                    <rect
                      rx='25.1443'
                      width='50.2886'
                      height='143.953'
                      fill={theme.palette.primary.main}
                      transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
                    />
                    <rect
                      rx='25.1443'
                      width='50.2886'
                      height='143.953'
                      fillOpacity='0.4'
                      fill='url(#paint1_linear_7821_79167)'
                      transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
                    />
                    <rect
                      rx='25.1443'
                      width='50.2886'
                      height='143.953'
                      fill={theme.palette.primary.main}
                      transform='matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)'
                    />
                    <defs>
                      <linearGradient
                        y1='0'
                        x1='25.1443'
                        x2='25.1443'
                        y2='143.953'
                        id='paint0_linear_7821_79167'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop />
                        <stop offset='1' stopOpacity='0' />
                      </linearGradient>
                      <linearGradient
                        y1='0'
                        x1='25.1443'
                        x2='25.1443'
                        y2='143.953'
                        id='paint1_linear_7821_79167'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop />
                        <stop offset='1' stopOpacity='0' />
                      </linearGradient>
                    </defs>
                  </svg> */}
                  <Typography variant='h6' sx={{ ml: 2, fontWeight: 700, lineHeight: 1.2 }}>
                    {themeConfig.templateName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' sx={{ mb: 1 }}>
                    433 Walnut Ct Pittsburgh, PA 15237
                  </Typography>
                  {/* <Typography variant='body2' sx={{ mb: 1 }}>
                    United States, Pennsylvania
                  </Typography>
                  <Typography variant='body2'>(021) 374 473 07</Typography> */}
                </Box>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                <Table sx={{ maxWidth: '220px' }}>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='h6'>Invoice</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='h6'>{`#${data?.id}`}</Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Date Issued:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>
                          {data?.createdAt && format(new Date(data?.createdAt), 'dd/MM/yyy')}
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                    {/*<TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Date Due:</Typography>
                      </MUITableCell>
                       <MUITableCell>
                        <Typography variant='body2'>{data.invoice.dueDate}</Typography>
                      </MUITableCell> 
                    </TableRow>*/}
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        <Divider sx={{ mt: 6.5, mb: 5.5 }} />

        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 4 } }}>
              <Typography variant='subtitle2' sx={{ mb: 3, color: 'text.primary', letterSpacing: '.1px' }}>
                Invoice To:
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Name : {data?.vendor?.name}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Email : {data?.vendor?.email}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Contact : {data?.vendor?.contactNumber}
              </Typography>
              {/* <Typography variant='body2' sx={{ mb: 2 }}>
                {data.invoice.contact}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {data.invoice.companyEmail}
              </Typography> */}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: ['flex-start', 'flex-end'] }}>
              <div>
                <Typography variant='subtitle2' sx={{ mb: 3, color: 'text.primary', letterSpacing: '.1px' }}>
                  Bill To:
                </Typography>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Bank name:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data?.vendor?.bankName}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Account Title:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data?.vendor?.accountTitle}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>Account No:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data?.vendor?.accountNumber}</Typography>
                        </MUITableCell>
                      </TableRow>
                      {/* <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>IBAN:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data.paymentDetails.iban}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        <MUITableCell>
                          <Typography variant='body2'>SWIFT code:</Typography>
                        </MUITableCell>
                        <MUITableCell>
                          <Typography variant='body2'>{data.paymentDetails.swiftCode}</Typography>
                        </MUITableCell>
                      </TableRow> */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ mt: 6.5, mb: 0 }} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Qty / %age</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.charges?.map((item, index) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item?.description}</TableCell>
                    <TableCell>${item?.amount}</TableCell>
                    <TableCell>{item.chargeType === 1 ? item?.price : `${item.price}%`}</TableCell>
                    <TableCell>${item?.total}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <CardContent sx={{ pt: 8 }}>
          <Grid container>
            <Grid item xs={12} sm={7} lg={9} sx={{ order: { sm: 1, xs: 2 } }}>
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant='body2'
                  sx={{ mr: 2, color: 'text.primary', fontWeight: 600, letterSpacing: '.25px' }}
                >
                  Salesperson:
                </Typography>
                <Typography variant='body2'>{data?.vendor?.name}</Typography>
              </Box>

              <Typography variant='body2'>Thanks for your business</Typography>
            </Grid>
            <Grid item xs={12} sm={5} lg={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
              <CalcWrapper>
                <Typography variant='body2'>Subtotal:</Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                  ${data?.subTotal}
                </Typography>
              </CalcWrapper>
              <CalcWrapper>
                <Typography variant='body2'>Tax:</Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                  {data?.creditCardTax}%
                </Typography>
              </CalcWrapper>
              <Divider sx={{ mt: 5, mb: 3 }} />
              <CalcWrapper>
                <Typography variant='body2'>Total:</Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', letterSpacing: '.25px', fontWeight: 600 }}>
                  ${data?.grandTotal}
                </Typography>
              </CalcWrapper>
            </Grid>
          </Grid>
        </CardContent>

        <Divider sx={{ mt: 4.5, mb: 0 }} />
      </Box>

      <CardContent>
        <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
          <strong>Question?</strong>
        </Typography>
        <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
          <strong>Email us at:</strong>
        </Typography>
        <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
          <strong>accounts@rcmmatter.com</strong>
        </Typography>
      </CardContent>
      <CardContent>
        {!isPrinting && (
          <Box sx={{ mt: 0, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            {pathname === '/invoices/print/[id]' ? (
              <Button
                startIcon={<Printer />}
                sx={{ mr: 4 }}
                target='_blank'
                component='a'
                variant='contained'
                onClick={() => {
                  setIsPrinting(true)
                  setTimeout(() => {
                    window.print()
                  }, 1000)
                  setTimeout(() => {
                    setIsPrinting(false)
                  }, 5000)
                }}
              >
                Print
              </Button>
            ) : (
              <Link href={`/invoices/print/${data.id}`} passHref>
                <Button target='_blank' component='a' variant='contained' startIcon={<EyeOutline />}>
                  View
                </Button>
              </Link>
            )}
          </Box>
        )}
        <Typography variant='subtitle2' sx={{ color: 'text.primary', textAlign: 'center' }}>
          433 Walnut Ct, Pittsburgh, Pennsylvania 15101, USA . www.rcmmatter.com
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PreviewCard
