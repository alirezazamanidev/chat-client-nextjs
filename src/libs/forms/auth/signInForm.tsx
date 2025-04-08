'use client';
import InnerSignInForm from '@/components/auth/InnerSignInForm';
import { callApi } from '@/libs/helpers/callApi';
import { SetCookie } from '@/libs/helpers/cookie';
import { handleApiError } from '@/libs/helpers/errorHandler';
import { withFormik } from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import * as Yup from 'yup';

interface signInFormProps {
    router:AppRouterInstance
}
interface SignInFormValues {
  username: string;
  password: string;
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

export const SignInForm = withFormik<signInFormProps, SignInFormValues>({
  mapPropsToValues: (props) => ({
    username: '',
    password: '',
  }),
  validationSchema: SignInSchema,
  handleSubmit: async (values,{props}) => {
    try {
      const res = await callApi.post('auth/signin', values);
      if (res.status === 200) {
        await SetCookie('token',res.data.jwtToken);
        props.router.push('/')
      }
    } catch (error) {
      handleApiError(error);
    }
  },
})(InnerSignInForm);
