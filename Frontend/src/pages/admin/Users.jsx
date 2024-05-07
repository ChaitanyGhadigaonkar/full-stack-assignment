import { EditIcon, Plus } from "lucide-react"
import React, { useEffect, useState } from "react"

import useFetch from "../../hooks/useFetch"

import { useModalContext } from "../../context/ModalContext"
import EditUser from "../../components/admin/modals/user/EditUser"
import AddUser from "../../components/admin/modals/user/AddUser"

const Users = () => {
  const [users, setUsers] = useState([])

  const { openModal, setModalChildren, modalState } = useModalContext()

  const getUsers = async () => {
    const resData = await useFetch("/api/admin/users", "get", {})
    // console.log(resData.data)
    setUsers(resData.data)
  }

  const handleEditClick = (user) => {
    setModalChildren(
      <EditUser
        user={user}
        key={user.id}
      />
    )
    openModal()
  }

  const handleAddUser = () => {
    setModalChildren(<AddUser />)
    openModal()
  }

  useEffect(() => {
    getUsers()
  }, [modalState])
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold">Users</h1>

      <div className="w-full flex justify-end">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold flex gap-1 text-sm"
          onClick={handleAddUser}
        >
          <Plus size={20} />
          Add User
        </button>
      </div>

      <table className="w-full my-5 border-collapse border rounded-sm  dark:text-dark">
        <tr className="bg-slate-100 ">
          <th className="text-sm py-2 text-left pl-2">Id</th>
          <th className="text-sm py-2 text-left pl-2">User name</th>
          <th className="text-sm py-2 text-left pl-2">Email</th>
          <th className="text-sm py-2 text-left pl-2">Role</th>
          <th className="text-sm py-2 text-left pl-2">Edit</th>
        </tr>
        {users &&
          users.map((user) => (
            <tr key={user.id}>
              <td className="text-sm py-2 pl-2">{user.id}</td>
              <td className="text-sm py-2 pl-2">{user.name}</td>
              <td className="text-sm py-2 pl-2">{user.email}</td>
              <td className="text-sm py-2 pl-2">{user.role}</td>
              <td className="text-sm py-2 pl-2">
                <EditIcon
                  className="cursor-pointer"
                  onClick={() => handleEditClick(user)}
                />
              </td>
            </tr>
          ))}
      </table>
    </div>
  )
}

export default Users
