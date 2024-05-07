import React, { useState } from "react"
import { useModalContext } from "../../../../context/ModalContext"
import useFetch from "../../../../hooks/useFetch"
import toast from "react-hot-toast"

const EditUser = ({ user }) => {
  const [userRole, setUserRole] = useState(user.role)
  const updateUser = async () => {
    const resData = await useFetch(`/api/admin/users/${user.id}`, "put", {
      name: user.name,
      email: user.email,
      role: userRole,
    })
    if (resData.success) {
      toast.success("User updated")
      closeModal()
    }
  }

  const deleteUser = async () => {
    const resData = await useFetch(`/api/admin/users/${user.id}`, "delete", {})
    if (resData.success) {
      toast.success("User deleted")
      closeModal()
    }
  }
  const { closeModal } = useModalContext()
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
          value={user.name}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          readOnly
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
          value={user.email}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          readOnly
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
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
        >
          <option value="admin">admin</option>
          <option value="user">user</option>
        </select>
      </div>
      <div className="flex w-full justify-between">
        <button
          className="primary w-32 font-semibold disabled:cursor-not-allowed"
          disabled={userRole === user.role}
          onClick={updateUser}
        >
          Update
        </button>
        <button
          className="danger w-36 font-semibold "
          onClick={deleteUser}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default EditUser
