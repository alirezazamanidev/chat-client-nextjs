import date from 'moment-jalaali';

export function formatImageUrl(imagePath?: string, defaultImage = '/images/placeholder.jpg'): string {
    if (!imagePath) return defaultImage;
    
    // بررسی کنیم که آیا مسیر تصویر با http یا https شروع می‌شود
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // حذف 'public/' از ابتدای مسیر
    const cleanPath = imagePath.replace(/^public\//, '');
    
    // افزودن URL استاتیک به مسیر
    const staticUrl = process.env.NEXT_PUBLIC_STREEM_URL || '';
    return `${staticUrl}/${cleanPath}`;
  }

  export const formatDateNow = (time:Date)=>{
    return date(time).fromNow();
  }