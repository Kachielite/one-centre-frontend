import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <Outlet />
    </div>
  )
}

export default DashboardLayout
