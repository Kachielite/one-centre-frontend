import { createBrowserRouter } from "react-router-dom"
import { protectedLoader, publicOnlyLoader } from "@/core/route/util.ts"
import DashboardLayout from "@/core/components/layout/dashbooard.tsx"
import AuthLayout from "@/core/components/layout/auth.tsx"
import ErrorPage from "@/core/components/pages/error.page.tsx"
import NotFoundPage from "@/core/components/pages/not-found.page.tsx"
import LoginPage from "@/feature/auth/pages/login.page.tsx"
import RegisterPage from "@/feature/auth/pages/register.page.tsx"
import ForgetPasswordPage from "@/feature/auth/pages/forget-password.page.tsx"

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
            path: "/register",
            element: <RegisterPage />,
            loader: publicOnlyLoader,
          },
          {
            path: "/forget-password",
            element: <ForgetPasswordPage />,
            loader: publicOnlyLoader,
          },
          // {
          //   path: "/verify-reset",
          //   element: <VerifyResetPage />,
          //   loader: publicOnlyLoader,
          // },
          // {
          //   path: "/reset-password",
          //   element: <ResetPasswordPage />,
          //   loader: publicOnlyLoader,
          // },
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
