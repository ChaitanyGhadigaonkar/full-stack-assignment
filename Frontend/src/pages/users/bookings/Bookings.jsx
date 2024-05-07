import React, { useEffect, useState } from "react"
import { Edit } from "lucide-react"
import useFetch from "../../../hooks/useFetch"
import { useModalContext } from "../../../context/ModalContext"
import toast from "react-hot-toast"

function EditBookingModal({ booking }) {
  const [cabs, setCabs] = useState([])
  const [selectedOption, setSelectedOption] = useState(booking.cabDetails.id)
  const [selectedCab, setSelectedCab] = useState(booking.cabDetails)

  const [distance, setDistance] = useState(booking.distance)
  const [source, setSource] = useState(booking.source)
  const [destination, setDestination] = useState(booking.destination)

  const { closeModal } = useModalContext()
  const getCabs = async () => {
    const { data } = await useFetch("/api/cabs", "get", {})
    setCabs(data)
  }

  const onOptionChangeHandler = (e) => {
    setSelectedOption(e.target.value)
    setSelectedCab(cabs.find((cab) => cab.id === e.target.value))
  }

  const handleCancelBooking = async () => {
    const bookingId = booking.id
    const resData = await useFetch(
      `/api/bookings/${bookingId}/cancel`,
      "put",
      {}
    )
    if (resData.success) {
      toast.success("Booking Cancelled Successfully")
    }
    closeModal()
  }

  const handleUpdateBooking = async () => {
    if (source === "" || destination === "") {
      toast.error("Please enter source and destination location")
      return
    }
    const bookingId = booking.id

    const data = {
      cabId: selectedOption,
      source,
      destination,
      distance,
      totalCharge: distance * selectedCab.perkmcharge + selectedCab.fixedcharge,
    }

    const resData = await useFetch(`/api/bookings/${bookingId}`, "put", data)
    if (resData.success) {
      toast.success("Booking Updated Successfully")
    }
    closeModal()
  }
  useEffect(() => {
    getCabs()
  }, [])
  return (
    <div className="flex flex-col min-w-80">
      <h1 className="text-lg font-semibold">Edit Booking</h1>

      <div className="flex flex-col gap-4 my-2">
        <div className="flex gap-2">
          <h3 className="text-base font-semibold">Cabs : </h3>
          <select
            onChange={onOptionChangeHandler}
            value={selectedOption}
          >
            {cabs &&
              cabs.map((cab) => <option value={cab.id}>{cab.name}</option>)}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <h3 className="text-base font-semibold">Source : </h3>
          <input
            type="text"
            className="border rounded-md text-base px-3 py-2 w-44"
            value={source}
            onChange={(e) => {
              setSource(e.target.value)
              setDistance(Math.floor(Math.random() * 10) + 1)
            }}
          />
        </div>
        <div className="flex gap-2 items-center">
          <h3 className="text-base font-semibold">Destination : </h3>
          <input
            type="text"
            value={destination}
            className="border rounded-md text-base px-3 py-2 w-44"
            onChange={(e) => {
              setDestination(e.target.value)
              setDistance(Math.floor(Math.random() * 10) + 1)
            }}
          />
        </div>
        <div className="flex gap-2 items-center">
          <h3 className="text-base font-semibold">Distance : </h3>
          <p className="text-base">{distance}</p>
        </div>
        <div className="flex gap-2 items-center">
          <h3 className="text-base font-semibold">Total Charge : </h3>
          <p className="text-base">
            {distance * selectedCab.perkmcharge + selectedCab.fixedcharge}
          </p>
        </div>

        <div className="flex justify-between">
          <button
            className="default-btn"
            onClick={handleUpdateBooking}
          >
            Update
          </button>
          <button
            className="danger font-semibold w-28"
            onClick={handleCancelBooking}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
const Bookings = () => {
  const [bookings, setBookings] = useState([])

  const { openModal, setModalChildren, modalState } = useModalContext()

  const getBookings = async () => {
    const resData = await useFetch("/api/bookings", "get", {})
    setBookings(resData.data)
  }

  const handleEditBooking = (booking) => {
    setModalChildren(
      <EditBookingModal
        booking={booking}
        key={booking.id}
      />
    )
    openModal()
  }

  useEffect(() => {
    getBookings()
  }, [modalState])
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold">Your Bookings</h1>

      <div className="flex flex-col gap-4 my-2">
        {bookings &&
          bookings.map((booking) => (
            <div
              className="flex gap-4 items-center border border-gray-600 py-1 rounded-lg"
              key={booking.id}
            >
              <div className="flex gap-4 items-center w-1/2 justify-between">
                <div className="flex flex-col items-center justify-center md:mx-6">
                  <img
                    src={booking.cabDetails.image}
                    alt="cab"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <h3 className="font-semibold">{booking.cabDetails.name}</h3>
                </div>
                <div className="flex flex-col ">
                  <div className="flex gap-4 items-center justify-between w-full">
                    <h3 className="text-base font-semibold">Source : </h3>
                    <p className="text-sm font-semibold">{booking.source}</p>
                  </div>
                  <div className="flex gap-4 items-center justify-between w-full">
                    <h3 className="text-base font-semibold">Destination : </h3>
                    <p className="text-sm font-semibold">
                      {booking.destination}
                    </p>
                  </div>
                  <div className="flex gap-4 items-center justify-between w-full">
                    <h3 className="text-base font-semibold">Distance : </h3>
                    <p className="text-sm font-semibold">
                      {booking.distance} KM
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 w-1/2 items-center justify-center">
                <div className="flex flex-col items-center px-4">
                  <h3 className="text-base font-semibold">Total Charge : </h3>
                  <p className="text-lg font-semibold">
                    {booking.totalcharge} Rs
                  </p>
                </div>
                <div className="">
                  {booking.status === "completed" && (
                    <h3 className="text-base font-bold text-green-600 my-2 ml-2">
                      Completed
                    </h3>
                  )}
                  {booking.status === "pending" && (
                    <h3 className="text-base font-bold text-orange-600 my-2 ml-2">
                      Pending
                    </h3>
                  )}
                  {booking.status === "cancelled" && (
                    <h3 className="text-base font-bold text-gray-600 my-2 ml-2">
                      Cancel
                    </h3>
                  )}

                  <button
                    className="default-btn font-semibold w-28 justify-center flex gap-4 "
                    onClick={() => handleEditBooking(booking)}
                  >
                    <Edit />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Bookings
