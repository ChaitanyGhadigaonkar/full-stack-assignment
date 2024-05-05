import { createPortal } from "react-dom"
import { useModalContext } from "../context/ModalContext"
import { X } from "lucide-react"

const Modal = () => {
  const { modalState, closeModal, modalChildren } = useModalContext()

  if (!modalState) return null
  return createPortal(
    <div className="fixed inset-0 w-screen h-screen bg-slate-50/90 bg-opacity-10 flex items-center justify-center">
      <div className="max-w-96 border border-slate-600 h-max-content px-6 py-4 rounded-2xl">
        <div className="flex w-full justify-end mb-2">
          <X
            onClick={() => closeModal()}
            className="text-xl cursor-pointer"
          />
        </div>
        {modalChildren}
      </div>
    </div>,
    document.getElementById("modal-root")
  )
}

export default Modal
