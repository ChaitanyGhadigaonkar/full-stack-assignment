import { createContext, useContext, useState } from "react"

export const SidebarContext = createContext()

export const SidebarContextProvider = ({ children }) => {
  const [sidebarState, setSidebarState] = useState(true)

  const openSidebar = () => {
    setSidebarState(true)
  }
  const closeSidebar = () => {
    setSidebarState(false)
  }

  return (
    <SidebarContext.Provider
      value={{ sidebarState, openSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider")
  }

  return context
}
