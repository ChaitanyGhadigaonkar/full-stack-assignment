import React, { useState } from "react"
import { useModalContext } from "../../../../context/ModalContext"
import useFetch from "../../../../hooks/useFetch"
import toast from "react-hot-toast"

const EditBookings = ({ booking }) => {
  const { closeModal } = useModalContext()

  const [bookingDetails, setBookingDetails] = useState({
    cab_id: booking.cab_id,
    user_id: booking.user_id,
    source: booking.source,
    destination: booking.destination,
    distance: booking.distance,
    totalcharge: booking.totalcharge,
    status: booking.status,
  })
  const updateBooking = async () => {
    const resData = await useFetch(`/api/admin/bookings/${booking.id}`, "put", {
      source: bookingDetails.source,
      destination: bookingDetails.destination,
      status: bookingDetails.status,
    })
    if (resData.success) {
      toast.success("User updated")
      closeModal()
    }
  }

  const deleteBooking = async () => {
    const resData = await useFetch(
      `/api/admin/bookings/${booking.id}`,
      "delete",
      {}
    )
    if (resData.success) {
      toast.success("User deleted")
      closeModal()
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold w-80">Edit Booking Modal</h1>

      <div className="flex gap-2 items-center my-1">
        <label
          htmlFor="cabId"
          className="font-semibold"
        >
          Cab Id
        </label>
        <input
          type="text"
          name="cadId"
          id="cabId"
          value={bookingDetails.cab_id}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          readOnly
        />
      </div>
      <div className="flex gap-2 items-center">
        <label
          htmlFor="user_id"
          className="font-semibold"
        >
          user_id
        </label>
        <input
          type="text"
          name="user_id"
          id="user_id"
          value={bookingDetails.user_id}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          readOnly
        />
      </div>
      <div className="flex gap-2 items-center">
        <label
          htmlFor="source"
          className="font-semibold"
        >
          source
        </label>
        <input
          type="text"
          name="source"
          id="source"
          value={bookingDetails.source}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          onChange={(e) => {
            setBookingDetails({ ...bookingDetails, source: e.target.value })
          }}
        />
      </div>
      <div className="flex gap-2 items-center">
        <label
          htmlFor="destination"
          className="font-semibold"
        >
          Destination
        </label>
        <input
          type="text"
          name="destination"
          id="destination"
          value={bookingDetails.destination}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          onChange={(e) => {
            setBookingDetails({ ...bookingDetails, source: e.target.value })
          }}
        />
      </div>
      <div className="flex gap-2 items-center">
        <label
          htmlFor="distance"
          className="font-semibold"
        >
          distance
        </label>
        <input
          type="text"
          name="distance"
          id="distance"
          value={bookingDetails.distance}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          readOnly
        />
      </div>
      <div className="flex gap-2 items-center">
        <label
          htmlFor="totalcharge"
          className="font-semibold"
        >
          totalcharge
        </label>
        <input
          type="text"
          name="totalcharge"
          id="totalcharge"
          value={bookingDetails.totalcharge}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          readOnly
        />
      </div>
      <div className="flex gap-2 items-center">
        <label
          htmlFor="status"
          className="font-semibold"
        >
          status
        </label>
        <select
          name="status"
          id="status"
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          value={bookingDetails.status}
          onChange={(e) => {
            setBookingDetails({ ...bookingDetails, status: e.target.value })
          }}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="flex w-full justify-between">
        <button
          className="primary w-32 font-semibold disabled:cursor-not-allowed"
          //   disabled={userRole === user.role}
          onClick={updateBooking}
        >
          Update
        </button>
        <button
          className="danger w-36 font-semibold "
          onClick={deleteBooking}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default EditBookings
