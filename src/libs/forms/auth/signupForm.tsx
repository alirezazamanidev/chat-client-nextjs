'use client';

import InnerSignUpForm from '@/components/auth/innerSignupForm';
import { callApi } from '@/libs/helpers/callApi';
import { SetCookie } from '@/libs/helpers/cookie';
import { handleApiError } from '@/libs/helpers/errorHandler';
import { withFormik } from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import * as Yup from 'yup';

interface signInFormProps {
  router: AppRouterInstance;
}
interface SignInFormValues {
  fullName: string;
  username: string;
  password: string;
  avatar: File;
}
// Validation schema using Yup
const SignUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces')
    .required('Full name is required'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers and underscores',
    )
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')

    .required('Password is required'),
});

export const SignUpForm = withFormik<signInFormProps, SignInFormValues>({
  mapPropsToValues: (props) => ({
    fullName: '',
    username: '',
    password: '',
    avatar: null as unknown as File,
  }),
  validationSchema: SignUpSchema,
  handleSubmit: async (values, { setSubmitting, props }) => {
    try {
      // Create FormData object for file upload
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('fullName', values.fullName);
      formData.append('password', values.password);

      formData.append('avatar', values.avatar);
      console.log(values.avatar);

      // Send request to API
      const response = await callApi.post('/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        localStorage.setItem('userId', response.data.userId);
        
        await SetCookie('token', response.data.jwtToken);
        props.router.push('/');
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setSubmitting(false);
    }
  },
})(InnerSignUpForm);
