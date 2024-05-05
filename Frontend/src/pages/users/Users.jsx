import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const Users = () => {
  const navigate = useNavigate()


  useEffect(() => {

    const isAuthenticated = localStorage.getItem("userDetails")

    if (!isAuthenticated) {
      navigate("/login")
    }
    
  }, [])

  return <Outlet />
}

export default Users
