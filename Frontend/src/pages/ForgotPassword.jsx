import React, { useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import useFetch from "../hooks/useFetch"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const [passwordResetLink, setPasswordResetLink] = useState("")

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    if (email === "") return toast.error("Please enter your email")
    const resData = await useFetch("/api/auth/forgot-password", "post", {
      email,
    })
    if (resData.success) {
      setPasswordResetLink(`${resData.data.resetPasswordLink}`)
      return
    }
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold font-mono my-2">Forgot Password</h1>

      <form
        onSubmit={handleForgotPassword}
        className="flex flex-col items-center "
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="primary font-semibold"
          type="submit"
        >
          Submit
        </button>
      </form>

      {passwordResetLink && (
        <button>
          <Link to={passwordResetLink}>Reset Password</Link>
        </button>
      )}
    </div>
  )
}

export default ForgotPassword
