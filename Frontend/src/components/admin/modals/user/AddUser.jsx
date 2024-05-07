import React, { useState } from "react"
import toast from "react-hot-toast"
import useFetch from "../../../../hooks/useFetch"
import { useModalContext } from "../../../../context/ModalContext"

const AddUser = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const [role, setRole] = useState("user")

  const { closeModal } = useModalContext()
  const addUser = async () => {
    if (password !== cPassword) {
      toast.error("Passwords do not match")
      return
    }
    const resData = await useFetch("/api/admin/users", "post", {
      name,
      email,
      password,
      cPassword,
      role,
    })
    if (resData.success) {
      toast.success("User added successfully")
    }
    closeModal()
  }
  return (
    <div>
      <h1 className="text-xl font-semibold w-80">Edit user Modal</h1>

      <div className="flex gap-2 items-center my-1">
        <label
          htmlFor="name"
          className="font-semibold"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
        />
      </div>
      <div className="flex gap-2 items-center">
        <label
          htmlFor="email"
          className="font-semibold"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex gap-2 items-center">
        <label
          htmlFor="password"
          className="font-semibold"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex gap-2 items-center">
        <label
          htmlFor="cpassword"
          className="font-semibold"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="cpassword"
          id="cpassword"
          value={cPassword}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          onChange={(e) => setCPassword(e.target.value)}
        />
      </div>
      <div className="flex gap-2 items-center">
        <label
          htmlFor="role"
          className="font-semibold"
        >
          Role
        </label>
        <select
          name="role"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
        >
          <option value="admin">admin</option>
          <option value="user">user</option>
        </select>
      </div>
      <div className="flex w-full justify-between">
        <button
          className="primary w-32 font-semibold disabled:cursor-not-allowed"
          onClick={addUser}
        >
          Add Uset
        </button>
      </div>
    </div>
  )
}

export default AddUser
