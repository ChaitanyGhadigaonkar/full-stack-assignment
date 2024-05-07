import React, { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"
import { EditIcon, Plus } from "lucide-react"
import { useModalContext } from "../../context/ModalContext"
import AddCab from "../../components/admin/modals/cabs/AddCab"
import EditCab from "../../components/admin/modals/cabs/EditCab"

const Cabs = () => {
  const [cabs, setCabs] = useState([])

  const { openModal, setModalChildren, modalState } = useModalContext()
  const getCabs = async () => {
    const resData = await useFetch("/api/cabs", "get", {})
    setCabs(resData.data)
    console.log(resData.data)
  }

  const handleAddCab = () => {
    setModalChildren(<AddCab />)
    openModal()
  }

  const handleEditClick = (cab) => {
    setModalChildren(<EditCab cab={cab} />)
    openModal()
  }
  useEffect(() => {
    getCabs()
  }, [modalState])

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold">Cabs</h1>

      <div className="w-full flex justify-end">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold flex gap-1 text-sm"
          onClick={handleAddCab}
        >
          <Plus size={20} />
          Add Cabs
        </button>
      </div>

      <table className="w-full my-5 border-collapse border rounded-sm  dark:text-dark">
        <tr className="bg-slate-100 ">
          <th className="text-sm py-2 text-left pl-2 max-w-20">Id</th>
          <th className="text-sm py-2 text-left pl-2 max-w-20">Cab name</th>
          <th className="text-sm py-2 text-left pl-2 max-w-20">FixedCharge</th>
          <th className="text-sm py-2 text-left pl-2 max-w-20">PerKmCharge</th>
          <th className="text-sm py-2 text-left pl-2 max-w-20">Image LInk</th>
          <th className="text-sm py-2 text-left pl-2 max-w-20">Edit</th>
        </tr>
        {cabs &&
          cabs.map((cab) => (
            <tr key={cab.id}>
              <td className="text-sm py-2 pl-2 max-w-20">{cab.id}</td>
              <td className="text-sm py-2 pl-2 max-w-20">{cab.name}</td>
              <td className="text-sm py-2 pl-2 max-w-20">{cab.fixedcharge}</td>
              <td className="text-sm py-2 pl-2 max-w-20">{cab.perkmcharge}</td>
              <td className="text-sm py-2 pl-2 max-w-20 truncate">
                {cab.image}
              </td>
              <td className="text-sm py-2 pl-2 max-w-20">
                <EditIcon
                  className="cursor-pointer"
                  onClick={() => handleEditClick(cab)}
                />
              </td>
            </tr>
          ))}
      </table>
    </div>
  )
}

export default Cabs
