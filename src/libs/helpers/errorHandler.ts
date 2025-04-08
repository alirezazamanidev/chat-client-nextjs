import toast from 'react-hot-toast';
import { BaseException } from '../exceptions';

export const handleApiError = (error: any) => {
  if (error instanceof BaseException) {
    // خطاهای شناخته شده را مدیریت می‌کنیم
    switch (error.statusCode) {
      case 401:
        // می‌توانید کاربر را به صفحه لاگین هدایت کنید
        showErrorToast(error.message);
        break;
      case 403:
        // نمایش پیام خطای دسترسی غیرمجاز
        showErrorToast(error.message);
        break;
      default:
        // نمایش سایر خطاها
        showErrorToast(error.message);
    }
  } else {
    // خطاهای پیش‌بینی نشده
    showErrorToast('خطای غیرمنتظره‌ای رخ داده است');
    console.error(error);
  }
};

// تابع کمکی برای نمایش پیام خطا (با استفاده از کتابخانه toast دلخواه)
const showErrorToast = (message: string) => {
  // اینجا می‌توانید از کتابخانه toast دلخواه خود استفاده کنید
  // مثال:
  toast.error(message);
  
}; 