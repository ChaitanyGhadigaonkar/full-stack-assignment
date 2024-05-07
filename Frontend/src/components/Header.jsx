import { LogOut, Menu } from "lucide-react"
import React, { useEffect, useMemo, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSidebarContext } from "../context/SidebarContext"
import useFetch from "../hooks/useFetch"
import toast from "react-hot-toast"

const Header = () => {
  const { pathname } = useLocation()
  const { openSidebar } = useSidebarContext()

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
    <div className="px-1 py-3 flex justify-between items-center">
      <div className="logo flex gap-2 items-center">
        <Menu
          className="sm:hidden"
          onClick={openSidebar}
        />
        <Link
          to="/"
          className="logo text-head text-xl font-semibold"
        >
          OLA
        </Link>
      </div>
      <nav className="items-center gap-8 sm:flex">
        <div className="hidden sm:flex gap-8">
          <Link
            to={"/"}
            className={`${pathname === "/" && "text-accent"} font-medium `}
          >
            Home
          </Link>

          {!isAuthenticated && (
            <>
              <Link
                to={"/login"}
                className={`${
                  pathname === "/login" && "text-accent"
                } font-medium `}
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className={`${
                  pathname === "/register" && "text-accent"
                } font-medium `}
              >
                Register
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link
                to="users/profile"
                className="font-medium"
              >
                Profile
              </Link>
              <Link
                to="users/bookings"
                className="font-medium"
                onClick={() => {
                  closeSidebar()
                }}
              >
                My Bookings
              </Link>
              <button
                className="font-medium flex gap-1 items-center justify-center"
                onClick={logout}
              >
                Logout <LogOut size={20} />
              </button>
            </>
          )}
        </div>

        <button className="default-btn">
          <Link to="/users/book-now">Book Now</Link>
        </button>
      </nav>
    </div>
  )
}

export default Header
