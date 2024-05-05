import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"
import Root from "./Root"
import Admin from "./Admin"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Users from "./pages/users/Users"
import BookNow from "./pages/users/bookings/BookNow"
import Bookings from "./pages/users/bookings/Bookings"
import Profile from "./pages/users/profile/profile"

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
        element: <h1>users</h1>,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
