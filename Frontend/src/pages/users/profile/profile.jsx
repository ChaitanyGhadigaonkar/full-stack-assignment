import { EditIcon } from "lucide-react"
import React, { useRef } from "react"
import { useModalContext } from "../../../context/ModalContext"

const Profile = () => {
  const inputProfileRef = useRef(null)

  const { setModalChildren, openModal } = useModalContext()

  const handleUpdatePassword = () => {
    setModalChildren(
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-base font-semibold">Update Password</h1>
        <input
          type="password"
          placeholder="Old password"
          className="border rounded-md text-sm md:text-base px-3 py-2 my-2 md:w-72 lg:w-96"
        />
        <input
          type="password"
          placeholder="New password"
          className="border rounded-md text-sm md:text-base px-3 py-2 my-2 md:w-72 lg:w-96"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          className="border rounded-md text-sm md:text-base px-3 py-2 my-2 md:w-72 lg:w-96"
        />
        <button className="default-btn text-sm md:text-base">
          Update password
        </button>
      </div>
    )
    openModal()
  }
  return (
    <div className="flex flex-1 flex-col gap-10 items-center justify-center">
      <div className="flex flex-col items-center justify-center relative">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="profile"
          className="rounded-full w-32 h-32 object-cover"
        />
        <input
          type="file"
          name="profile"
          id="profile"
          className="hidden"
          ref={inputProfileRef}
        />
        <EditIcon
          className="absolute right-1 bottom-7 cursor-pointer"
          onClick={() => inputProfileRef.current.click()}
        />
        <h1 className="text-2xl font-semibold">John Doe</h1>
      </div>

      <div className="w-full flex flex-col md:px-8 gap-4">
        <h1 className="text-xl font-semibold">Personal Information</h1>

        <div className="flex flex-col gap-4 md:px-4">
          <div className="flex gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row md:gap-4 md:items-center">
              <h3 className="font-semibold text-sm md:text-base">Name : </h3>
              <input
                type="text"
                className="border rounded-md text-sm md:text-base px-3 py-2 my-2 md:w-72 lg:w-96"
              />
            </div>

            <button className="default-btn text-sm md:text-base">
              update name
            </button>
          </div>
          <div className="flex gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row md:gap-4 md:items-center">
              <h3 className="font-semibold text-sm md:text-base">Email : </h3>
              <input
                type="email"
                className="border rounded-md text-sm md:text-base px-3 py-2 my-2 md:w-72 lg:w-96"
              />
            </div>

            <button className="default-btn text-sm md:text-base">
              update email
            </button>
          </div>
          <div className="w-full ">
            <button
              className="danger mx-auto font-semibold"
              onClick={handleUpdatePassword}
            >
              Update password
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
