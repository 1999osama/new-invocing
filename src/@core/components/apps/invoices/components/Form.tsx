// ** React Import
import * as React from 'react'
import { useId } from 'react'
// ** MUI Imports
import LoadingButton from '@mui/lab/LoadingButton'
import Box, { BoxProps } from '@mui/material/Box'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Collapse from '@mui/material/Collapse'
import {
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  GridProps,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  TextField,
  Typography,
  styled
} from '@mui/material'
import { Close } from 'mdi-material-ui'

// ** Third Party Imports
import { useFieldArray } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Custom Hooks Imports
import { useInvoice } from 'src/@core/hooks/apps/useInvoice'
import { useCustomers } from 'src/@core/hooks/apps/useCustomerRegistration'

// ** import form support components
import { InputField } from 'src/@core/components/form'

// ** Custom Components Imports
import { DrawerFooter } from 'src/@core/components/common/DrawerFooter'
import CustomerSelect from './SelectOne'
import ControlledRadioButtonsGroup from 'src/@core/components/form/Radio'

interface Props {
  serviceId: string | null
  onClose?: () => void
}

const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const RepeatingContent = styled(Grid)<GridProps>(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.5rem',
    position: 'absolute'
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const InvoiceAction = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const TotalBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  [theme.breakpoints.down('xl')]: {
    marginTop: 18
  },
  [theme.breakpoints.down('lg')]: {
    marginTop: 0
  }
}))

const Form: React.FC<Props> = ({ serviceId, onClose }) => {
  // ** Hooks
  const {
    form: {
      getValues,
      control,
      handleSubmit,
      setValue,
      formState: { errors },
      clearErrors
    },
    addInvoice,
    updateInvoice,
    store
  } = useInvoice(serviceId)

  const { store: customerStore } = useCustomers(null)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'charges'
  })

  const [isInvoiceSubmitted, setIsInvoiceSubmitted] = React.useState(false)
  const [chargeAmounts, setChargeAmounts] = React.useState<number[]>(
    // serviceId ? store?.entity?.charges?.map(ele => parseFloat(ele?.amount)) || [] :
    Array(fields?.length).fill(0)
  )

  const [chargePrices, setChargePrices] = React.useState<number[]>(
    // serviceId ? store?.entity?.charges?.map(ele => parseFloat(ele?.price)) || [] :
    Array(fields?.length).fill(0)
  )

  const [chargeType, setChargeType] = React.useState<number[]>(
    // serviceId ? store?.entity?.charges?.map(ele => parseFloat(ele?.price)) || [] :
    Array(fields?.length).fill(1)
  )

  const [creditCardTax, setCreditCardTax] = React.useState<number | undefined>(0)
  const [balance_credit, setBalance_Credit] = React.useState<number>(0)
  // serviceId ? Number(store.entity?.creditCardTax) : undefined

  const calculateSubTotal = () => {
    let subTotal = 0
    fields.forEach((_, index) => {
      const amount = parseFloat(getValues(`charges.${index}.amount` as any)) || 0
      const price = parseFloat(getValues(`charges.${index}.price` as any)) || 0
      const chargeType = parseFloat(getValues(`charges.${index}.chargeType` as any)) || 0
      if (chargeType === 1) {
        subTotal += amount * price
      } else {
        subTotal += (amount * price) / 100
      }
    })
    return subTotal
  }

  const calculateGrandTotal = () => {
    const subTotal = calculateSubTotal()
    console.log('balance_credit', balance_credit, typeof balance_credit)
    const subtotalAfterBalance_Credit = subTotal + balance_credit
    const tax = creditCardTax || 0
    return subtotalAfterBalance_Credit + (subtotalAfterBalance_Credit * tax) / 100
  }

  const [subTotal, setSubTotal] = React.useState(calculateSubTotal)
  const [grandTotal, setGrandTotal] = React.useState(calculateGrandTotal)

  React.useEffect(() => {
    setGrandTotal(calculateGrandTotal)
    setValue('grandTotal', calculateGrandTotal())
    setValue('subTotal', subTotal)
  }, [subTotal, creditCardTax, balance_credit, serviceId])

  React.useEffect(() => {
    setSubTotal(calculateSubTotal)
  }, [chargePrices, chargeAmounts, serviceId, chargeType])

  const calculateTotal = (amount: number, price: number, chargeType: number) => {
    if (chargeType === 1) {
      return amount * price
    } else {
      return (price * amount) / 100
    }
  }

  const onSubmit = async (data: any) => {
    console.log('data', data)
    if (!data.charges.length) {
      return toast.error('Charges Are Mandatory')
    }
    if (serviceId) {
      data.charges = data.charges.map((ele: any) => {
        return {
          description: ele.description,
          chargeType: ele.chargeType,
          amount: ele.amount,
          price: ele.price,
          total: ele.total
        }
      })
      await updateInvoice(serviceId, data)
    } else {
      await addInvoice(data).then(({ data: payloadData }) => {
        if (payloadData) {
          setIsInvoiceSubmitted(true)
          setChargeAmounts(Array(fields.length).fill(0))
          setChargePrices(Array(fields.length).fill(0))
          setChargeType(Array(fields.length).fill(0))
          setCreditCardTax(0)
          setSubTotal(0)
          setGrandTotal(0)
        }
      })
    }
  }

  const onDelete = (index: number) => {
    setChargePrices(prevPrices => {
      const newPrices = [...prevPrices]
      newPrices.splice(index, 1)
      return newPrices
    })

    setChargeAmounts(prevAmounts => {
      const newAmounts = [...prevAmounts]
      newAmounts.splice(index, 1)
      return newAmounts
    })
    remove(index)
  }

  React.useEffect(() => {
    const fetchInitialValues = async () => {
      if (serviceId) {
        const initialChargeAmounts = store?.entity?.charges?.map(ele => parseFloat(ele?.amount)) || []
        const initialChargePrices = store?.entity?.charges?.map(ele => parseFloat(ele?.price)) || []
        const initialChargeType = store?.entity?.charges?.map(ele => parseFloat(ele?.chargeType)) || []
        const initialChargeTax = store?.entity?.creditCardTax
        const intialBalance_credit = Number(store.entity?.balance_credit)
        store?.entity?.charges?.map((ele, index) =>
          setValue(`charges.${index}.description`, ele.description as string)
        ) || []
        setChargeAmounts(initialChargeAmounts)
        setChargeType(initialChargeType)
        setChargePrices(initialChargePrices)
        setCreditCardTax(initialChargeTax as number)
        setBalance_Credit(intialBalance_credit as number)
      } else {
        setChargeAmounts(Array(fields?.length).fill(0))
        setChargePrices(Array(fields?.length).fill(0))
        setChargeType(Array(fields?.length).fill(1))
      }
    }
    fetchInitialValues()
  }, [serviceId, store?.entity])

  const options = [
    {
      value: 1,
      label: 'Qty'
    },
    {
      value: 2,
      label: '%age'
    }
  ]

  const labelId = useId()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ p: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={10}>
            <CustomerSelect
              execute={!serviceId && !customerStore.entities.length ? true : false}
              customer={store.entity}
              setCustomer={e => setValue('vendor', e.id)}
              isInvoiceSubmitted={isInvoiceSubmitted}
              setIsInvoiceSubmitted={setIsInvoiceSubmitted}
              serviceId={serviceId}
            />
            {errors && errors.vendor ? (
              <Typography variant='body2' color='error'>
                {errors?.vendor?.message}
              </Typography>
            ) : null}
          </Grid>
          {/* <Grid item xs={12} sm={2}>
            <TextField
              label='Credit Card Tax %'
              type='number'
              value={creditCardTax}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCreditCardTax(Number(e.target.value))
                setValue('creditCardTax', Number(e.target.value))
              }}
              fullWidth
            />
            {errors && errors.creditCardTax ? (
              <Typography variant='body2' color='error'>
                {errors?.creditCardTax?.message}
              </Typography>
            ) : null}
          </Grid> */}
          <Grid item xs={12} sm={12}>
            <InputLabel>Charges</InputLabel>
            {serviceId
              ? fields?.map((item, index) => {
                  const Tag = index === 0 ? Box : Collapse
                  const charge = store.entity?.charges?.[index]
                  return (
                    <Tag key={index} className='repeater-wrapper' {...(index !== 0 ? { in: true } : {})}>
                      <Grid container sx={{ mt: 5, mb: 5 }}>
                        <RepeatingContent item xs={12}>
                          <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                            <Grid item lg={5} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                              <Typography
                                variant='subtitle2'
                                className='col-title'
                                sx={{ mb: { md: 2, xs: 2 }, color: 'text.primary' }}
                              >
                                Description
                              </Typography>
                              <InputField
                                name={`charges.${index}.description`}
                                label={`description`}
                                type='text'
                                placeholder='Enter Description'
                                control={control}
                                // required
                                rows={5}
                              />
                            </Grid>
                            <Grid item lg={2.5} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                              <Typography
                                variant='subtitle2'
                                className='col-title'
                                sx={{ mb: { md: 2, xs: 2 }, color: 'text.primary' }}
                              >
                                ChargeType
                              </Typography>
                              <RadioGroup
                                row
                                aria-labelledby={labelId}
                                name={`charges.${index}.chargeType`}
                                value={chargeType[index]}
                                onChange={(e: any) => {
                                  const newChargeType = [...chargeType]
                                  newChargeType[index] = Number(e.target.value)
                                  setChargeType(newChargeType)
                                  setValue(`charges.${index}.chargeType`, Number(e.target.value))
                                }}
                              >
                                {options?.map(option => (
                                  <FormControlLabel
                                    // key={useId()}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                  />
                                ))}
                              </RadioGroup>
                              {errors && errors.charges && errors.charges.length && errors?.charges?.length > 0 ? (
                                <Typography variant='body2' color='error'>
                                  {errors?.charges[index]?.chargeType?.message}
                                </Typography>
                              ) : null}
                            </Grid>
                            <Grid item lg={1.5} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                              <Typography
                                variant='subtitle2'
                                className='col-title'
                                sx={{ mb: { md: 2, xs: 2 }, color: 'text.primary' }}
                              >
                                Price
                              </Typography>
                              <TextField
                                label='Price'
                                size='small'
                                type='number'
                                InputProps={{ inputProps: { min: 0 } }}
                                value={chargeAmounts[index]}
                                onChange={(e: any) => {
                                  const newAmounts = [...chargeAmounts]
                                  newAmounts[index] = e.target.value
                                  setChargeAmounts(newAmounts)
                                  setValue(`charges.${index}.amount`, Number(e.target.value))
                                  setValue(
                                    `charges.${index}.total`,
                                    calculateTotal(
                                      Number(e.target.value),
                                      Number(chargePrices[index]),
                                      Number(chargeType[index])
                                    )
                                  )
                                }}
                              />
                              {errors && errors.charges && errors.charges.length && errors?.charges?.length > 0 ? (
                                <Typography variant='body2' color='error'>
                                  {errors?.charges[index]?.amount?.message}
                                </Typography>
                              ) : null}
                            </Grid>
                            <Grid item lg={1.5} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                              <Typography
                                variant='subtitle2'
                                className='col-title'
                                sx={{ mb: { md: 2, xs: 2 }, color: 'text.primary' }}
                              >
                                {chargeType[index] === 1 ? 'Qty' : '%age'}
                              </Typography>
                              <TextField
                                type='number'
                                size='small'
                                label={chargeType[index] === 1 ? 'Qty' : '%age'}
                                InputProps={{ inputProps: { min: 0 } }}
                                value={chargePrices[index]}
                                onChange={(e: any) => {
                                  const newPrices = [...chargePrices]
                                  newPrices[index] = e.target.value
                                  setChargePrices(newPrices)
                                  setValue(`charges.${index}.price`, Number(e.target.value))
                                  setValue(
                                    `charges.${index}.total`,
                                    calculateTotal(
                                      Number(chargeAmounts[index]),
                                      Number(e.target.value),
                                      Number(chargeType[index])
                                    )
                                  )
                                }}
                              />
                              {errors && errors.charges && errors.charges.length && errors?.charges?.length > 0 ? (
                                <Typography variant='body2' color='error'>
                                  {errors?.charges[index]?.price?.message}
                                </Typography>
                              ) : null}
                            </Grid>
                            <Grid item lg={1.5} md={1} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                              <Typography
                                variant='subtitle2'
                                className='col-title'
                                sx={{ mb: { md: 2, xs: 2 }, color: 'text.primary' }}
                              >
                                Total
                              </Typography>
                              <Typography variant='body2'>
                                $
                                {calculateTotal(
                                  Number(chargeAmounts[index]),
                                  Number(chargePrices[index]),
                                  Number(chargeType[index])
                                )}
                              </Typography>
                              {errors && errors.charges && errors.charges.length && errors?.charges?.length > 0 ? (
                                <Typography variant='body2' color='error'>
                                  {errors?.charges[index]?.total?.message}
                                </Typography>
                              ) : null}
                            </Grid>
                          </Grid>
                          <InvoiceAction>
                            <IconButton size='small' onClick={() => onDelete(index)}>
                              <Close fontSize='small' color='error' />
                            </IconButton>
                          </InvoiceAction>
                        </RepeatingContent>
                      </Grid>
                    </Tag>
                  )
                })
              : fields.map((item, index) => {
                  const Tag = index === 0 ? Box : Collapse
                  return (
                    <Tag key={index} className='repeater-wrapper' {...(index !== 0 ? { in: true } : {})} sx={{ mt: 5 }}>
                      <Grid container sx={{ mt: 2 }}>
                        <RepeatingContent item xs={12}>
                          <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                            <Grid item lg={5} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                              <Typography
                                variant='subtitle2'
                                className='col-title'
                                sx={{ mb: { md: 2, xs: 2 }, color: 'text.primary' }}
                              >
                                Description
                              </Typography>
                              <InputField
                                name={`charges.${index}.description`}
                                label={`description`}
                                type='text'
                                placeholder='Enter Description'
                                control={control}
                                // required
                                rows={5}
                              />
                            </Grid>
                            <Grid item lg={2.5} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                              <Typography
                                variant='subtitle2'
                                className='col-title'
                                sx={{ mb: { md: 2, xs: 2 }, color: 'text.primary' }}
                              >
                                ChargeType
                              </Typography>
                              <RadioGroup
                                row
                                aria-labelledby={labelId}
                                name={`charges.${index}.chargeType`}
                                value={chargeType[index]}
                                onChange={(e: any) => {
                                  const newChargeType = [...chargeType]
                                  newChargeType[index] = Number(e.target.value)
                                  setChargeType(newChargeType)
                                  setValue(`charges.${index}.chargeType`, Number(e.target.value))
                                }}
                              >
                                {options?.map(option => (
                                  <FormControlLabel
                                    // key={useId()}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                  />
                                ))}
                              </RadioGroup>
                            </Grid>
                            <Grid item lg={1.5} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                              <Typography
                                variant='subtitle2'
                                className='col-title'
                                sx={{ mb: { md: 2, xs: 2 }, color: 'text.primary' }}
                              >
                                Price
                              </Typography>
                              <TextField
                                label='Price'
                                size='small'
                                type='number'
                                InputProps={{ inputProps: { min: 0 } }}
                                value={chargeAmounts[index]}
                                onChange={(e: any) => {
                                  const newAmounts = [...chargeAmounts]
                                  newAmounts[index] = e.target.value
                                  setChargeAmounts(newAmounts)
                                  setValue(`charges.${index}.amount`, Number(e.target.value))
                                  setValue(
                                    `charges.${index}.total`,
                                    calculateTotal(
                                      Number(e.target.value),
                                      Number(chargePrices[index]),
                                      Number(chargeType[index])
                                    )
                                  )
                                }}
                              />
                              {errors && errors.charges && errors.charges.length && errors?.charges?.length > 0 ? (
                                <Typography variant='body2' color='error'>
                                  {errors?.charges[index]?.amount?.message}
                                </Typography>
                              ) : null}
                            </Grid>
                            <Grid item lg={1.5} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                              <Typography
                                variant='subtitle2'
                                className='col-title'
                                sx={{ mb: { md: 2, xs: 2 }, color: 'text.primary' }}
                              >
                                {chargeType[index] === 1 ? 'Qty' : '%age'}
                              </Typography>
                              <TextField
                                type='number'
                                size='small'
                                label={chargeType[index] === 1 ? 'Qty' : '%age'}
                                InputProps={{ inputProps: { min: 0 } }}
                                value={chargePrices[index]}
                                onChange={(e: any) => {
                                  const newPrices = [...chargePrices]
                                  newPrices[index] = e.target.value
                                  setChargePrices(newPrices)
                                  setValue(`charges.${index}.price`, Number(e.target.value))
                                  setValue(
                                    `charges.${index}.total`,
                                    calculateTotal(
                                      Number(chargeAmounts[index]),
                                      Number(e.target.value),
                                      Number(chargeType[index])
                                    )
                                  )
                                }}
                              />
                              {errors && errors.charges && errors.charges.length && errors?.charges?.length > 0 ? (
                                <Typography variant='body2' color='error'>
                                  {errors?.charges[index]?.price?.message}
                                </Typography>
                              ) : null}
                            </Grid>
                            <Grid item lg={1.5} md={1} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2 }}>
                              <Typography
                                variant='subtitle2'
                                className='col-title'
                                sx={{ mb: { md: 2, xs: 2 }, color: 'text.primary' }}
                              >
                                Total
                              </Typography>
                              <Typography variant='body2'>
                                $
                                {calculateTotal(
                                  Number(chargeAmounts[index]),
                                  Number(chargePrices[index]),
                                  Number(chargeType[index])
                                )}
                              </Typography>
                              {errors && errors.charges && errors.charges.length && errors?.charges?.length > 0 ? (
                                <Typography variant='body2' color='error'>
                                  {errors?.charges[index]?.total?.message}
                                </Typography>
                              ) : null}
                            </Grid>
                          </Grid>
                          <InvoiceAction>
                            <IconButton
                              size='small'
                              onClick={() => onDelete(index)}
                              disabled={store.status === 'pending' || customerStore.status === 'pending'}
                            >
                              <Close fontSize='small' color='error' />
                            </IconButton>
                          </InvoiceAction>
                        </RepeatingContent>
                      </Grid>
                    </Tag>
                  )
                })}
          </Grid>
          <Grid item xs={12} sm={6}>
            <LoadingButton
              type='button'
              color='primary'
              variant='contained'
              loading={store.status === 'pending' || customerStore.status === 'pending'}
              disabled={store.status === 'pending' || customerStore.status === 'pending'}
              startIcon={<AddCircleIcon />}
              onClick={() => {
                append({
                  amount: 0,
                  description: '',
                  chargeType: 1,
                  price: 0,
                  total: 0
                })
                setChargeAmounts(prevAmounts => [...prevAmounts, 0])
                setChargePrices(prevPrices => [...prevPrices, 0])
                setChargeType(prevType => [...prevType, 1])
              }}
            >
              Add
            </LoadingButton>
          </Grid>
        </Grid>
        <Divider />

        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ order: { sm: 1, xs: 2 } }}></Grid>
            <Grid item xs={12} sm={6} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
              <CalcWrapper>
                <Typography variant='body2'>Subtotal:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px' }}>
                  ${subTotal}
                </Typography>
              </CalcWrapper>
              <CalcWrapper sx={{ alignItems: 'center' }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant='body2'>Balance/Credit</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    size='small'
                    label=''
                    InputProps={{ inputProps: { min: 0, step: 'any' } }}
                    type='number'
                    value={balance_credit}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setBalance_Credit(Number(e.target.value))
                      setValue('balance_credit', Number(e.target.value))
                    }}
                    fullWidth
                  />
                  {errors && errors.balance_credit ? (
                    <Typography variant='body2' color='error'>
                      {errors?.balance_credit?.message}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px', textAlign: 'end' }}
                  >
                    ${balance_credit || 0}
                  </Typography>
                </Grid>
              </CalcWrapper>
              <CalcWrapper>
                <Typography variant='body2'>SubTotal after Balance/Credit:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px' }}>
                  ${subTotal + balance_credit || 0}
                </Typography>
              </CalcWrapper>
              <CalcWrapper sx={{ alignItems: 'center' }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant='body2'>Credit Card Merchant Fee (CCMF): </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    size='small'
                    label=''
                    type='number'
                    InputProps={{ inputProps: { min: 0, step: 'any' } }}
                    value={creditCardTax}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setCreditCardTax(Number(e.target.value))
                      setValue('creditCardTax', Number(e.target.value))
                    }}
                    fullWidth
                  />
                  {errors && errors.creditCardTax ? (
                    <Typography variant='body2' color='error'>
                      {errors?.creditCardTax?.message}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px', textAlign: 'end' }}
                  >
                    {creditCardTax || 0}%
                  </Typography>
                </Grid>
              </CalcWrapper>
              <Divider sx={{ mt: 6, mb: 1.5 }} />
              <CalcWrapper>
                <Typography variant='body2'>Grand Total:</Typography>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px' }}>
                  ${grandTotal.toFixed(2)}
                </Typography>
              </CalcWrapper>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ my: 1 }} />
      </Box>
      <DrawerFooter sx={{ position: 'relative', bottom: '0', width: '100%' }}>
        <LoadingButton
          sx={{ mr: 3 }}
          loading={store.status === 'pending' || customerStore.status === 'pending'}
          disabled={store.status === 'pending' || customerStore.status === 'pending'}
          loadingPosition='end'
          size='large'
          variant='contained'
          type='submit'
          endIcon={store.status === 'pending' || (customerStore.status === 'pending' && <CircularProgress size={20} />)}
        >
          Submit
        </LoadingButton>
      </DrawerFooter>
    </form>
  )
}

export default Form
