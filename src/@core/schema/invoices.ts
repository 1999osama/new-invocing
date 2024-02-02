import * as yup from 'yup'

const chargesSchema = yup.array().of(
  yup.object({
    description: yup.string().required('Description is required'),
    amount: yup.number().min(1, 'Amount must be greater than or equal to 0').required('Amount is required'),
    price: yup.number().min(1, 'Price must be greater than or equal to 0').required('Price is required'),
    total: yup.number().min(1, 'Total must be greater than or equal to 0').required('Total is required')
  })
)

export default {
  add: yup.object().shape({
    vendor: yup.string().required('Vendor is required'),
    charges: chargesSchema,
    // subtotal: yup.number().min(1, 'Subtotal must be greater than or equal to 0').required('Subtotal is required'),
    creditCardTax: yup
      .number()
      .min(1, 'Credit Card Tax must be greater than or equal to 0')
      .required('Credit Card Tax is required')
    // grandTotal: yup
    //   .number()
    //   .min(1, 'Grand Total must be greater than or equal to 0')
    //   .required('Grand Total is required')
  })
}
