import React, { useState } from "react"
import { useModalContext } from "../../../../context/ModalContext"
import useFetch from "../../../../hooks/useFetch"
import toast from "react-hot-toast"

const AddCab = () => {
  const { closeModal } = useModalContext()

  const [cabDetails, setCabDetails] = useState({
    name: "",
    fixedcharge: "",
    perkmcharge: "",
    image: "",
  })
  const addCab = async () => {
    const resData = await useFetch(`/api/admin/cabs`, "post", {
      name: cabDetails.name,
      fixedCharge: cabDetails.fixedcharge,
      perKmCharge: cabDetails.perkmcharge,
      image: cabDetails.image,
    })
    if (resData.success) {
      toast.success("cab updated")
      closeModal()
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold w-80">Edit Cab Modal</h1>

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
          value={cabDetails.name}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          onChange={(e) => {
            setCabDetails({ ...cabDetails, name: e.target.value })
          }}
        />
      </div>
      <div className="flex gap-2 items-center">
        <label
          htmlFor="FixedCharge"
          className="font-semibold"
        >
          FixedCharge
        </label>
        <input
          type="text"
          name="fixedCharge"
          id="fixedCharge"
          value={cabDetails.fixedcharge}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          onChange={(e) => {
            setCabDetails({ ...cabDetails, fixedcharge: e.target.value })
          }}
        />
      </div>
      <div className="flex gap-2 items-center">
        <label
          htmlFor="perkmcharge"
          className="font-semibold"
        >
          perkmcharge
        </label>
        <input
          type="text"
          name="perkmcharge"
          id="perkmcharge"
          value={cabDetails.perkmcharge}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          onChange={(e) => {
            setCabDetails({ ...cabDetails, perkmcharge: e.target.value })
          }}
        />
      </div>
      <div className="flex gap-2 items-center">
        <label
          htmlFor="image"
          className="font-semibold"
        >
          image
        </label>
        <input
          type="text"
          name="image"
          id="image"
          value={cabDetails.image}
          className="border rounded-md text-base px-3 py-2 my-2 w-72"
          onChange={(e) => {
            setCabDetails({ ...cabDetails, image: e.target.value })
          }}
        />
      </div>

      <div className="flex w-full justify-between">
        <button
          className="primary w-36 font-semibold "
          onClick={addCab}
        >
          Add Cab
        </button>
      </div>
    </div>
  )
}

export default AddCab
