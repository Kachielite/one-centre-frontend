import { createBrowserRouter } from "react-router-dom"
import { protectedLoader, publicOnlyLoader } from "@/core/route/util.ts"
import DashboardLayout from "@/core/components/layout/dashbooard.tsx"
import AuthLayout from "@/core/components/layout/auth.tsx"
import ErrorPage from "@/core/components/pages/error.page.tsx"
import NotFoundPage from "@/core/components/pages/not-found.page.tsx"
import LoginPage from "@/feature/auth/pages/login.page.tsx"
import RegisterPage from "@/feature/auth/pages/register.page.tsx"
import ForgetPasswordPage from "@/feature/auth/pages/forget-password.page.tsx"
import VerifyEmailPage from "@/feature/auth/pages/verify-email.page.tsx"
import VerifyOtpPage from "@/feature/auth/pages/verify-otp.page.tsx"
import ResetPasswordPage from "@/feature/auth/pages/reset-password.page.tsx"

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        loader: protectedLoader,
        children: [],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
            loader: publicOnlyLoader,
          },
          {
            path: "/verify-email",
            element: <VerifyEmailPage />,
            loader: publicOnlyLoader,
          },
          {
            path: "/register",
            element: <RegisterPage />,
            loader: publicOnlyLoader,
          },
          {
            path: "/forget-password",
            element: <ForgetPasswordPage />,
            loader: publicOnlyLoader,
          },
          {
            path: "/verify-otp",
            element: <VerifyOtpPage />,
            loader: publicOnlyLoader,
          },
          {
            path: "/reset-password",
            element: <ResetPasswordPage />,
            loader: publicOnlyLoader,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
])
