import * as yup from 'yup'

const chargesSchema = yup.array().of(
  yup.object({
    description: yup.string().required('Description is required'),
    chargeType: yup.number().required('Charge Type is Required'),
    amount: yup.number().moreThan(0, 'Amount must be greater than or equal to 0').required('Amount is required'),
    price: yup.number().moreThan(0, 'Price must be greater than or equal to 0').required('Price is required'),
    total: yup.number().moreThan(0, 'Total must be greater than or equal to 0').required('Total is required')
  })
)

export default {
  add: yup.object().shape({
    vendor: yup.string().required('Vendor is required'),
    charges: chargesSchema,
    // subtotal: yup.number().min(1, 'Subtotal must be greater than or equal to 0').required('Subtotal is required'),
    creditCardTax: yup
      .string()
      .required('Credit Card Tax is required')
      .test('valid-percentage', 'Invalid percentage format', value => {
        if (!value) return true
        const percentageRegex = /^(?:\d{0,2}(?:\.\d{1,2})?|100(?:\.0{1,2})?)%?$/
        const decimalRegex = /^\d+(\.\d{1,2})?$/ // Allow up to two decimal places
        if (!(percentageRegex.test(value) || decimalRegex.test(value))) {
          return false
        }
        const decimalValue = value.includes('%') ? parseFloat(value) / 100 : parseFloat(value)
        return decimalValue >= 0 && decimalValue <= 99.9
      })
      .transform(originalValue => {
        if (originalValue) {
          return originalValue.includes('%') ? parseFloat(originalValue) / 100 : originalValue
        }
        return originalValue
      })
    // yup
    //   .number()
    //   .min(1, 'Credit Card Tax must be greater than or equal to 0')
    //   .required('Credit Card Tax is required')
    // grandTotal: yup
    //   .number()
    //   .min(1, 'Grand Total must be greater than or equal to 0')
    //   .required('Grand Total is required')
  })
}
