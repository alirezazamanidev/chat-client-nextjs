import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import {
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  ValidationException,
  InternalServerException,
} from "../exceptions";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

   
    

    // تبدیل خطاهای HTTP به اکسپشن‌های سفارشی
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage =
        (data as { message?: string })?.message || "خطایی رخ داده است";

      switch (status) {
        case 400:
          throw new BadRequestException(errorMessage);
        case 401:
          throw new UnauthorizedException(errorMessage);
        case 403:
          throw new ForbiddenException(errorMessage);
        case 404:
          throw new NotFoundException(errorMessage);
        case 422:
          throw new ValidationException(errorMessage);
        default:
          throw new InternalServerException(errorMessage);
      }
    }

    throw new InternalServerException("خطا در برقراری ارتباط با سرور");
  }
);


export const callApi=axiosInstance;
