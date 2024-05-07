import React, { useEffect, useState } from "react"
import { useModalContext } from "../../../../context/ModalContext"
import useFetch from "../../../../hooks/useFetch"
import toast from "react-hot-toast"

const AddBooking = () => {
  const { closeModal } = useModalContext()
  const [cabs, setCabs] = useState([])
  const [bookingDetails, setBookingDetails] = useState({
    user_id: "",
    source: "",
    destination: "",
    status: "pending",
  })
  const [selectedCab, setSelectedCab] = useState()
  const [distance, setDistance] = useState(1)

  const getCabs = async () => {
    const resData = await useFetch(`/api/cabs`, "get", {})
    if (resData.success) {
      setCabs(resData.data)
      setSelectedCab(resData.data[0])
    }
  }
  const addBooking = async () => {
    // console.log({
    //   cab_id: selectedCab.id,
    //   user_id: bookingDetails.user_id,
    //   source: bookingDetails.source,
    //   destination: bookingDetails.destination,
    //   distance: distance,
    //   totalcharge: distance * selectedCab.fixedcharge + selectedCab.perkmcharge,
    //   status: bookingDetails.status,
    // })
    const resData = await useFetch(`/api/admin/bookings`, "post", {
      cab_id: selectedCab.id,
      user_id: bookingDetails.user_id,
      source: bookingDetails.source,
      destination: bookingDetails.destination,
      distance: distance,
      totalcharge: distance * selectedCab.fixedcharge + selectedCab.perkmcharge,
      status: bookingDetails.status,
    })
    if (resData.success) {
      toast.success("User updated")
      closeModal()
    }
  }

  useEffect(() => {
    getCabs()
  }, [])
  return (
    <div>
      <h1 className="text-xl font-semibold w-80">Add Booking</h1>
      <div className="flex gap-2 items-center my-1">
        <label
          htmlFor="cabId"
          className="font-semibold"
        >
          Cab Id
        </label>
        <select
          value={selectedCab?.id}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          onChange={(e) =>
            setSelectedCab(cabs.find((cab) => cab.id === e.target.value))
          }
        >
          {cabs &&
            cabs.map((cab) => (
              <option
                value={cab.id}
                key={cab.id}
              >
                {cab.name}
              </option>
            ))}
        </select>
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
          onChange={(e) => {
            setBookingDetails({ ...bookingDetails, user_id: e.target.value })
          }}
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
            setDistance(Math.floor(Math.random() * 10) + 1)
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
            setBookingDetails({
              ...bookingDetails,
              destination: e.target.value,
            })
            setDistance(Math.floor(Math.random() * 10) + 1)
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
          value={distance}
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
          value={distance * selectedCab?.fixedcharge + selectedCab?.perkmcharge}
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
          onClick={addBooking}
        >
          Add Booking
        </button>
      </div>
    </div>
  )
}

export default AddBooking
