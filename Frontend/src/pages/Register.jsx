import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("userDetails"))
    console.log(isAuthenticated)
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
        action=""
        className="flex flex-col items-center "
      >
        <input
          type="text"
          placeholder="Enter your name"
          className="border  rounded-md text-base px-3 py-2 my-2 w-72"
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="border  rounded-md text-base px-3 py-2 my-2 w-72"
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
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
