import NavBar from "./components/myComponents/NavBar"
import Footer from "./components/myComponents/Footer"
import { Outlet } from "react-router-dom"

function Layout({}) {

  return (
    <>
      <NavBar />
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Layout
