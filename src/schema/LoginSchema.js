import * as Yup from 'yup'

const LoginSchema = Yup.object({
    username:Yup.string().required(),
    email :Yup.string().email().required(),
    
})

export default LoginSchema