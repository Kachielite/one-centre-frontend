const ENV = {
  BASE_URL: import.meta.env.VITE_BACKEND_API_URL as string,
  STORAGE_KEY: import.meta.env.VITE_STORAGE_KEY as string,
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
}

export default ENV
