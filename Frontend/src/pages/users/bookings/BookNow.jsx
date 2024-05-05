import React, { useEffect, useState } from "react"
import useFetch from "../../../hooks/useFetch"
const cabsObject = [
  {
    id: 1,
    name: "Mini",
    fixedCharge: 100,
    image:
      "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/TukTuk_Black_v1.png",
  },
  {
    id: 2,
    name: "Sedan",
    fixedCharge: 200,
    image:
      "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberXL_new_2022.png",
  },
  {
    id: 3,
    name: "SUV",
    fixedCharge: 300,
    image:
      "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberComfort_new_2022.png",
  },
]

const BookNow = () => {
  const [cabs, setCabs] = useState([])
  const [showCabs, setShowCabs] = useState()

  const [selectedCab, setSelectedCab] = useState()

  const handleSearchCabs = (e) => {
    e.preventDefault()
    setShowCabs(false)
    for (let i = 0; i < 1000000000; i++) {}
    setShowCabs(true)
  }

  const fetchCabs = async () => {
    const { data } = await useFetch("/api/cabs", "get", {})
    setCabs(data)
    setSelectedCab(data[0])
  }
  useEffect(() => {
    fetchCabs()
  }, [])
  return (
    <div className="">
      <h1 className="text-xl font-semibold text-black flex flex-col items-center justify-center">
        Get a ride
      </h1>

      <form
        className="flex flex-col gap-4 mt-4 w-full"
        onSubmit={handleSearchCabs}
      >
        <input
          type="text"
          placeholder="Pickup location"
          className="border rounded-md text-base px-3 py-2 my-2 w-72 mx-auto"
        />
        <input
          type="text"
          placeholder="Dropoff location"
          className="border rounded-md text-base px-3 py-2 my-2 w-72 mx-auto"
        />

        <button
          className="primary font-semibold w-72 mx-auto"
          type="submit"
        >
          Search Cabs
        </button>
      </form>

      {/* TODO: Available cabs with loading*/}
      {/* {!showCabs && null} */}
      {showCabs === false ? (
        <h1 className="text-center font-semibold my-2 text-xl">loading...</h1>
      ) : (
        <div className="bottom w-full my-10 flex flex-col gap-7">
          <h3 className="text-xl font-semibold font-mono">Choose a cab</h3>
          <div className="flex flex-col gap-4 w-full cursor-pointer">
            {cabs.map((cab) => (
              <div
                key={cab.id}
                className={`flex items-center gap-2 border-2 rounded-lg justify-between px-4 w-full ${
                  selectedCab.id === cab.id && "border-slate-600"
                }`}
                onClick={() => setSelectedCab(cab)}
              >
                <div className="flex items-center ">
                  <img
                    src={cab.image}
                    alt={cab.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex flex-col ">
                    <h3 className="text-lg font-semibold">{cab.name}</h3>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
                <div className="pr-4">
                  <p className="text-lg font-semibold">₹ {cab.fixedcharge}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="default-btn w-full text-lg ">
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  )
}

export default BookNow
