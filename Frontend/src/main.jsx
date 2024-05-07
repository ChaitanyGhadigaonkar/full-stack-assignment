import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"
import Root from "./Root"
import Admin from "./pages/admin/Admin"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Users from "./pages/users/Users"
import BookNow from "./pages/users/bookings/BookNow"
import Bookings from "./pages/users/bookings/Bookings"
import Profile from "./pages/users/profile/profile"
import Dashboard from "./pages/admin/Dashboard"
import AdminUsers from "./pages/admin/Users"
import AdminBookings from "./pages/admin/Bookings"
import AdminCabs from "./pages/admin/Cabs"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "users",
        element: <Users />,
        children: [
          { path: "book-now", element: <BookNow /> },
          {
            path: "bookings",
            element: <Bookings />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "bookings",
        element: <AdminBookings />,
      },
      {
        path: "cabs",
        element: <AdminCabs />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
