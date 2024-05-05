import { createContext, useContext, useState } from "react"

const ModalContext = createContext()

export const ModalContextProvider = ({ children }) => {
  const [modalState, setModalState] = useState(false)
  const [modalChildren, setModalChildren] = useState(null)

  const openModal = () => {
    setModalState(true)
  }
  const closeModal = () => {
    setModalState(false)
  }

  return (
    <ModalContext.Provider
      value={{
        modalState,
        setModalState,
        openModal,
        closeModal,
        setModalChildren,
        modalChildren,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error(
      "useModalContext must be used within a ModalContextProvider"
    )
  }
  return context
}
export default ModalContext
