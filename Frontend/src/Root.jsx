import { Outlet } from "react-router-dom"
import "./App.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { SidebarContextProvider } from "./context/SidebarContext"
import MobileMenu from "./components/MobileMenu"
import Toast from "./components/Toast"
import { ModalContextProvider } from "./context/ModalContext"
import Modal from "./components/Modal"

function App() {
  return (
    <SidebarContextProvider>
      <ModalContextProvider>
        <div className="max-w-screen-xl min-h-screen flex flex-col justify-between mx-auto px-6 relative">
          <Header />
          <MobileMenu />
          <Modal />
          <Toast />
          <Outlet />
          <Footer />
        </div>
      </ModalContextProvider>
    </SidebarContextProvider>
  )
}

export default App
