import React, { useEffect } from "react"
import toast from "react-hot-toast"
import { Outlet, useNavigate } from "react-router-dom"
import Header from "../../components/admin/Header"
import Toast from "../../components/Toast"
import { ModalContextProvider } from "../../context/ModalContext"
import Sidebar from "../../components/admin/Sidebar"
import Modal from "../../components/Modal"

const Admin = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("userDetails"))

    if (!isAuthenticated) {
      navigate("/login")
    }
    if (isAuthenticated.role !== "admin") {
      toast.error("You are not authorized to view this page")
      navigate("/login")
    }
  }, [])

  return (
    <>
      <ModalContextProvider>
        <Header />
        <Modal />
        <Toast />

        <div className="w-full flex px-2 md:px-6">
          <Sidebar />
          <div className="w-2/3 px-4 py-3">
            <Outlet />
          </div>
        </div>
      </ModalContextProvider>
    </>
  )
}

export default Admin
