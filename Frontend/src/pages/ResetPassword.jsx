import React, { useState } from "react"
import toast from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import useFetch from "../hooks/useFetch"

const ResetPassword = () => {
  const [credentials, setCredentials] = useState({
    password: "",
    cPassword: "",
  })

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleResetPassword = async (e) => {
    e.preventDefault()

    const resData = await useFetch("/api/auth/reset-password", "post", {
      token: pathname.split("/")[2],
      password: credentials.password,
      cPassword: credentials.cPassword,
    })

    if (resData.success) {
      toast.success(resData.data.message)
      navigate("/login")
      return
    }
    navigate("/reset-password")
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold font-mono my-2">
        Reset Your Password
      </h1>

      <form
        onSubmit={handleResetPassword}
        className="flex flex-col items-center "
      >
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

        <button
          className="primary font-semibold"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
