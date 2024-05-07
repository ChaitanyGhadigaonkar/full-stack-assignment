import { LogOut, X } from "lucide-react"
import { useSidebarContext } from "../context/SidebarContext"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { toast } from "react-hot-toast"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"

const MobileMenu = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { closeSidebar, sidebarState } = useSidebarContext()

  let isAuthenticated = JSON.parse(localStorage.getItem("userDetails"))

  const logout = async () => {
    const { success, data } = await useFetch("/api/auth/logout", "get", null)

    localStorage.removeItem("userDetails")
    toast.success(data.message)
    navigate("/login")
  }

  return (
    <div
      className={`overlay fixed flex inset-0 bg-[#33333380] z-20 w-full min-h-screen transition-transform  duration-700 ${
        sidebarState ? "translate-x-0" : "-translate-x-full"
      } sm:hidden`}
    >
      <div
        className={`w-full h-full bg-slate-50 xs:w-3/4 duration-500 ${
          sidebarState ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <header className="px-3 py-4 w-full flex justify-between item-center">
          <Link
            to={"/"}
            onClick={() => {
              closeSidebar()
            }}
            className="logo text-head text-xl font-semibold"
          >
            OLA
          </Link>
          <X
            className=" text-head text-xl my-1"
            onClick={() => closeSidebar()}
          />
        </header>
        <nav className="items-start gap-6 flex flex-col px-5 py-4">
          <Link
            to={"/"}
            onClick={() => {
              closeSidebar()
            }}
            className={`${pathname === "/" && "text-accent"} font-medium `}
          >
            Home
          </Link>
          {!isAuthenticated && (
            <>
              <Link
                to={"/login"}
                onClick={() => {
                  closeSidebar()
                }}
                className={`${
                  pathname === "/login" && "text-accent"
                } font-medium `}
              >
                login
              </Link>
              <Link
                to={"/register"}
                onClick={() => {
                  closeSidebar()
                }}
                className={`${
                  pathname === "/register"
                }" && "text-accent"} font-medium `}
              >
                register
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link
                to="users/profile"
                className="font-medium"
                onClick={() => {
                  closeSidebar()
                }}
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
          <button className="default-btn">
            <Link to="/users/book-now">Book Now</Link>
          </button>
        </nav>
      </div>
      <div
        className="flex-1"
        onClick={() => closeSidebar()}
      ></div>
    </div>
  )
}

export default MobileMenu
