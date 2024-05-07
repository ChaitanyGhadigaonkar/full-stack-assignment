import { Car, CarTaxiFront, LayoutDashboard, User } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"

const routes = [
  {
    path: "dashboard",
    name: "Dashboard",
    Icon: <LayoutDashboard />,
  },
  {
    path: "bookings",
    name: "Bookings",
    Icon: <CarTaxiFront />,
  },
  {
    path: "cabs",
    name: "Cabs",
    Icon: <Car />,
  },
  {
    path: "users",
    name: "Users",
    Icon: <User />,
  },
]
const Sidebar = () => {
  return (
    <div className="w-1/4 px-2 py-3">
      <div className="flex flex-col gap-6">
        {routes.map((route, index) => (
          <Link
            key={index}
            className="flex gap-2 items-center border-slate-400 rounded-md px-2 py-1 cursor-pointer"
            to={`/admin/${route.path}`}
          >
            <div className="font-semibold text-base ">{route.Icon}</div>
            <div className="font-semibold text-base ">{route.name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
