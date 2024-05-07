import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import toast from "react-hot-toast"

const Register = () => {
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  })

  const handleRegister = async (e) => {
    e.preventDefault()
    const data = await useFetch("/api/auth/register", "post", credentials)
    if (!data.success) {
      toast.error("failed to register")
      return
    }
    toast.success("Successfully registered")
    navigate("/login")
  }

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("userDetails"))
    // console.log(isAuthenticated)
    if (isAuthenticated) {
      navigate("/users/book-now")
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold font-mono my-2">
        Register with OLA
      </h1>

      <form
        className="flex flex-col items-center "
        onSubmit={handleRegister}
      >
        <input
          type="text"
          placeholder="Enter your name"
          className="border  rounded-md text-base px-3 py-2 my-2 w-72"
          value={credentials.name}
          onChange={(e) =>
            setCredentials({ ...credentials, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="border  rounded-md text-base px-3 py-2 my-2 w-72"
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
        <input
          type="password"
          placeholder="Confirm password"
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          value={credentials.cPassword}
          onChange={(e) =>
            setCredentials({ ...credentials, cPassword: e.target.value })
          }
        />

        <button className="primary font-semibold">Submit</button>
        <div className="flex w-full">
          <Link
            to="/login"
            className="text-blue-700 my-2 font-semibold text-sm hover:underline w-full text-center"
          >
            Already registered? Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register
