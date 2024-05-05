import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import toast from "react-hot-toast"

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const data = await useFetch("/api/auth/login", "post", {
      email: credentials.email,
      password: credentials.password,
    })

    toast.success(data.data.message)
    localStorage.setItem("userDetails", JSON.stringify(data.data.userDetails))
    setCredentials({ email: "", password: "" })
    navigate("/users/book-now")
  }

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("userDetails"))
    if (isAuthenticated?.email) {
      navigate("/users/book-now")
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold font-mono my-2">Login with OLA</h1>

      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center "
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />

        <button
          className="primary font-semibold"
          type="submit"
        >
          Submit
        </button>
        <div className="flex w-full">
          <Link
            to="/forgot-password"
            className="text-black my-2 font-semibold text-sm hover:underline w-full text-center"
          >
            Forgot Password?
          </Link>
          <Link
            to="/register"
            className="text-blue-700 my-2 font-semibold text-sm hover:underline w-full text-center"
          >
            New Here? Register
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
