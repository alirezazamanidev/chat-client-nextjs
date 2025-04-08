'use client'
import InnerSignInForm from "@/components/auth/InnerSignInForm";
import { handleApiError } from "@/libs/helpers/errorHandler";
import { withFormik } from "formik";

import * as Yup from 'yup';


interface signInFormProps{

}
interface SignInFormValues{
    username:string
    password:string
}
// Validation schema using Yup
const SignInSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });
  
export const SignInForm=withFormik<signInFormProps,SignInFormValues>({
    mapPropsToValues:(props)=>({
        username:'',
        password:'',
    }),
    validationSchema:SignInSchema,
    handleSubmit:(values)=>{
     try {
        
     } catch (error) {
        handleApiError(error)
     }
        
    }
})(InnerSignInForm)