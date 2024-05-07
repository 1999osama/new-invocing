import * as yup from 'yup'

export default {
  add: yup.object().shape({
    name: yup.string().required().min(2).max(50),
    // email: yup.string().required().min(2).max(30),
    vendor: yup.string().required().min(2).max(40),
    address: yup.string().required().min(2).max(200),
    wireCode: yup.string().required().min(2).max(20),
    routingNumber: yup.string().required().min(2).max(20),
    swiftCode: yup.string().required().min(2).max(20),
    title: yup.string().required().min(2).max(20),
    merchantName1: yup.string().required().min(2).max(30),
    merchantName2: yup.string().required().min(2).max(40),
    bankName: yup.string().required().min(2).max(40),
    accountTitle: yup.string().required().min(2).max(40),
    // accountNumber: yup.string().required().min(2).max(34),
    accountNumber: yup.string().required().min(2).max(34),
    bankAddress: yup.string().required().min(2).max(200),
    contactNumber: yup.string().required().min(7).max(20),
    tax : yup
        .string()
        .required('Tax is required')
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
  })
}
