import * as yup from 'yup'

export default {
  add: yup.object().shape({
    password: yup.string().min(5).required('Required'),
    first_name: yup.string().min(2).required(),
    last_name: yup.string().min(2).required(),
    email: yup.string().email().required(),
    gender: yup.string().required(),
    terms: yup.bool().oneOf([true], 'You must accept the privacy policy & terms')
  })
}
