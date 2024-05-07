import { LogOut } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import toast from "react-hot-toast"

const Header = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem("userDetails"))

  const logout = async () => {
    const resData = await useFetch("/api/auth/logout", "get", null)
    // console.log(resData)
    if (resData?.success) {
      localStorage.removeItem("userDetails")
      toast.success("Logged out successfully")
      window.location.href = "/"
    }
  }
  return (
    <div className="md:px-6 px-2 py-3 flex justify-between items-center">
      <div className="logo flex gap-2 items-center">
        <Link
          to="/"
          className="logo text-head text-xl font-semibold"
        >
          OLA
        </Link>
      </div>
      <nav className="items-center gap-8 sm:flex">
        <div className="hidden sm:flex gap-8">
          {isAuthenticated && (
            <>
              <button
                className="font-medium flex gap-1 items-center justify-center"
                onClick={logout}
              >
                Logout <LogOut size={20} />
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Header
