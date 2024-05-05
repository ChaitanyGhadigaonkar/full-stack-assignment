import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <footer className="flex w-full justify-between items-center ">
        <Link
          to="/"
          className="logo text-head text-xl font-semibold"
        >
          OLA
        </Link>
        <p className="text-sm my-2 ">Copyright &copy; 2024 www.abc.com </p>
      </footer>
    </div>
  )
}

export default Footer
