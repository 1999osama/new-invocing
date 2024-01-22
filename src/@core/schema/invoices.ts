import * as yup from 'yup'

export default {
  add: yup.object().shape({
    name: yup.string().required().min(5).max(30),
    description: yup.string().required().min(5).max(30)
  })
}
