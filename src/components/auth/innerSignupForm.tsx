'use client'
import { Form, FormikProps, Field, ErrorMessage } from "formik";
import { useState, useRef } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

// Constants for file validation
const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png'];
const FILE_SIZE = 2 * 1024 * 1024; // 2MB

export default function InnerSignUpForm({errors, touched, isSubmitting, setFieldValue}:FormikProps<any>){
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
      const file = event.currentTarget.files?.[0];
      if (!file) return;
  
      // Validate file type and size
      if (!SUPPORTED_FORMATS.includes(file.type)) {
        toast.error('Unsupported file format. Please upload a JPG, JPEG or PNG file.');
        return;
      }
  
      if (file.size > FILE_SIZE) {
        toast.error('File size is too large. Maximum size is 2MB.');
        return;
      }
  
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setFieldValue('avatar', file);
        toast.success('Avatar uploaded successfully!');
      };
      reader.readAsDataURL(file);
    };
  
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
    };
  
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
    };
  
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, setFieldValue: any) => {
      e.preventDefault();
      setIsDragging(false);
      
      const file = e.dataTransfer.files?.[0];
      if (!file) return;
  
      // Validate file type and size
      if (!SUPPORTED_FORMATS.includes(file.type)) {
        toast.error('Unsupported file format. Please upload a JPG, JPEG or PNG file.');
        return;
      }
  
      if (file.size > FILE_SIZE) {
        toast.error('File size is too large. Maximum size is 2MB.');
        return;
      }
  
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setFieldValue('avatar', file);
        toast.success('Avatar uploaded successfully!');
      };
      reader.readAsDataURL(file);
    };
  
    return(
        <Form className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm space-y-4">
          {/* Full Name Field */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <Field
              id="fullName"
              name="fullName"
              type="text"
              className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                errors.fullName && touched.fullName
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-700'
              } placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors`}
              placeholder="Enter your full name"
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                if (errors.fullName && touched.fullName) {
                  toast.error(errors.fullName as string);
                }
              }}
            />
            <ErrorMessage
              name="fullName"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <Field
              id="username"
              name="username"
              type="text"
              className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                errors.username && touched.username
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-700'
              } placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors`}
              placeholder="Choose a username"
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                if (errors.username && touched.username) {
                  toast.error(errors.username as string);
                }
              }}
            />
            <ErrorMessage
              name="username"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

          {/* Avatar Upload - Redesigned to be more elegant and minimal */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Picture
            </label>
            <div 
              className={`flex items-center justify-center ${isDragging ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-gray-50 dark:bg-gray-800'} border-2 border-dashed ${
                isDragging ? 'border-blue-400' : avatarPreview ? 'border-green-400' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg p-4 transition-all duration-300 cursor-pointer hover:border-blue-500`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, setFieldValue)}
            >
              <div className="flex flex-col items-center space-y-2">
                {avatarPreview ? (
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-700 shadow-lg">
                      <Image 
                        src={avatarPreview} 
                        alt="Avatar preview" 
                        width={80} 
                        height={80}
                        className="object-cover w-full h-full" 
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                
                <div className="text-center">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {avatarPreview ? 'Change photo' : 'Upload a photo'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {isDragging ? 'Drop to upload' : 'JPG, JPEG or PNG (max 2MB)'}
                  </p>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg, image/png, image/jpg"
                onChange={(e) => handleAvatarChange(e, setFieldValue)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <Field
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  errors.password && touched.password
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-700'
                } placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors`}
                placeholder="Create a strong password"
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  if (errors.password && touched.password) {
                    toast.error(errors.password as string);
                  }
                }}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

         
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200"
            onClick={() => {
              if (Object.keys(errors).length > 0) {
                toast.error("Please fix the errors before submitting");
              }
            }}
          >
            {isSubmitting ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <>
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Create Account
              </>
            )}
          </button>
        </div>
      </Form>
    )
}