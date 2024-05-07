import { EditIcon, Plus } from "lucide-react"
import React, { useEffect, useState } from "react"
import AddBookings from "../../components/admin/modals/bookings/AddBookings"
import EditBookings from "../../components/admin/modals/bookings/EditBookings"
import { useModalContext } from "../../context/ModalContext"
import useFetch from "../../hooks/useFetch"

const Bookings = () => {
  const [bookings, setBookings] = useState([])

  const { openModal, setModalChildren, modalState } = useModalContext()
  const getBookings = async () => {
    const resData = await useFetch("/api/admin/bookings", "get", {})
    setBookings(resData.data)
    console.log(resData.data)
  }

  const handleAddBooking = () => {
    setModalChildren(<AddBookings />)
    openModal()
  }

  const handleEditClick = (booking) => {
    setModalChildren(<EditBookings booking={booking} />)
    openModal()
  }
  useEffect(() => {
    getBookings()
  }, [modalState])

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold">Bookings</h1>

      <div className="w-full flex justify-end">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold flex gap-1 text-sm"
          onClick={handleAddBooking}
        >
          <Plus size={20} />
          Add Bookings
        </button>
      </div>

      <table className="w-full my-5 border-collapse border rounded-sm  dark:text-dark">
        <tr className="bg-slate-100 ">
          <th className="text-sm py-2 text-left pl-2 max-w-20 px-2">Id</th>
          <th className="text-sm py-2 text-left pl-2 max-w-20 px-2">Cab Id</th>
          <th className="text-sm py-2 text-left pl-2 max-w-20 px-2">User Id</th>
          <th className="text-sm py-2 text-left pl-2 max-w-20 px-2">Source</th>
          <th className="text-sm py-2 text-left pl-2 max-w-20 px-2">
            Destination
          </th>
          <th className="text-sm py-2 text-left pl-2 max-w-20 px-2">
            Distance (in KM)
          </th>
          <th className="text-sm py-2 text-left pl-2 max-w-20 px-2">
            Total Charge
          </th>
          <th className="text-sm py-2 text-left pl-2 max-w-20 px-2">Status</th>
          <th className="text-sm py-2 text-left pl-2 max-w-20 px-2">Edit</th>
        </tr>
        {bookings &&
          bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="text-sm py-2 pl-2 max-w-20">{booking.id}</td>
              <td className="text-sm py-2 pl-2 max-w-20">{booking.cab_id}</td>
              <td className="text-sm py-2 pl-2 max-w-20">{booking.user_id}</td>
              <td className="text-sm py-2 pl-2 max-w-20">{booking.source}</td>
              <td className="text-sm py-2 pl-2 max-w-20">
                {booking.destination}
              </td>
              <td className="text-sm py-2 pl-2 max-w-20">{booking.distance}</td>
              <td className="text-sm py-2 pl-2 max-w-20">
                {booking.totalcharge}
              </td>
              <td className="text-sm py-2 pl-2 max-w-20">{booking.status}</td>

              <td className="text-sm py-2 pl-2 max-w-20">
                <EditIcon
                  className="cursor-pointer"
                  onClick={() => handleEditClick(booking)}
                />
              </td>
            </tr>
          ))}
      </table>
    </div>
  )
}

export default Bookings
