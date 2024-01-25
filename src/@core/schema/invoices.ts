import * as yup from 'yup'

export default {
  add: yup.object().shape({
    balance: yup.string().required(),
    issuedDate: yup.string().required(),
    total: yup.string().required()
  })
}
