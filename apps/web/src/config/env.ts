export const env = {
  WEB_URL: import.meta.env.VITE_WEB_URL,
  USER_API_URL: import.meta.env.VITE_USER_API_URL,
  VIDEO_API_URL: import.meta.env.VITE_VIDEO_API_URL,
  THUMBNAIL_PUBLIC_URL: import.meta.env.VITE_THUMBNAIL_PUBLIC_URL,
  VIDEO_CDN_URL: import.meta.env.VITE_VIDEO_CDN_URL,
} as const
