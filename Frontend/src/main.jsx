import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"
import Root from "./Root"
import Admin from "./Admin"
import Login from "./pages/Login"
import Register from "./pages/Register"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <h1>Home</h1>,
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
        element: <h1>users</h1>,
        children: [
          { path: "", element: <h1>users</h1> },
          {
            path: ":id",
            element: <h1>user with userId</h1>,
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
