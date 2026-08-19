export const env = {
  WEB_URL: import.meta.env.VITE_WEB_URL,
  UPLOAD_API_URL: import.meta.env.VITE_UPLOAD_API_URL,
  AWS_CDN_URL: import.meta.env.VITE_AWS_CDN_URL,
  WEB_ENV: import.meta.env.VITE_WEB_ENV,
} as const
