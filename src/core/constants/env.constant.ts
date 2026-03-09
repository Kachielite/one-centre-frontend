const ENV = {
  BASE_URL: import.meta.env.VITE_BACKEND_API_URL as string,
  STORAGE_KEY: import.meta.env.VITE_STORAGE_KEY as string,
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
  // Derived keys for separate zustand stores to avoid collisions
  AUTH_STORAGE_KEY: `${import.meta.env.VITE_STORAGE_KEY as string}:auth`,
  USER_STORAGE_KEY: `${import.meta.env.VITE_STORAGE_KEY as string}:user`,
}

export default ENV
