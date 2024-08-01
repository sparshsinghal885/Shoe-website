import React, { useContext, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import logo from "../../assets/Logo.png"
import MyContext from '@/contexts/myContext/MyContext'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import cart from "../../assets/cart.png"

const NavBar = () => {

  const cartItems = useSelector((state) => state.cart);

  const navItems = [
    {
      lable: "All Products",
      href: "/allproducts"
    },
    {
      lable: "Men",
      href: "/men"
    },
    {
      lable: "Women",
      href: "/women"
    },
    {
      lable: "Kids",
      href: "/kids"
    },
    {
      lable: "User DashBoard",
      href: "/user-dashboard"
    },
    {
      lable: "Admin DashBoard",
      href: "/admin-dashboard"
    },
    {
      lable: "Contact",
      href: "/contact"
    }
  ]

  const { isLoggedIn, setIsLoggedIn } = useContext(MyContext);

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const navigate = useNavigate()

  const toggleNavBar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  }

  const Logout = () => {
    signOut(auth);
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/')
  }

  return (
    <nav className=' sticky top-0 z-50 py-3 bg-white backdrop-blur-lg border-b border-neutral-700/80'>
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">

          <Link to="/">
            <div className="flex items-center flex-shrink-0">
              <img src={logo} alt="Shoepify" className='h-10 w-10 mr-2' />
              <span className='text-xl tracking-tight '>Shoepify</span>
            </div>
          </Link>

          <ul className='hidden lg:flex ml-14 space-x-12'>
            {navItems.map((item, index) => (
              <li key={index}>
                <Link to={`${item.href}`} >
                  {item.lable}
                </Link>
              </li>
            ))}
          </ul>


          {isLoggedIn
            ?
            (<div className='hidden lg:flex justify-center space-x-12 items-center'>
              <button onClick={Logout} className=' py-2 px-3 border rounded-md bg-slate-900 text-white'>
                Logout
              </button>
              {isLoggedIn && 
              <button onClick={() => navigate('/cart')} className='flex py-2 px-3 border-4 border-slate-950 rounded-md bg-white text-black space-x-2'>
                <img className='text-white w-5 mr-3' src={cart} alt="cart" />{cartItems.length}
              </button>}
            </div>)
            :
            (<div className="hidden lg:flex justify-center space-x-12 items-center">
              <Link to="/auth/signin" className='py-2 px-3 border rounded-md'>
                Sign in
              </Link>

              <Link to="/auth/signup" className='py-2 px-3 border rounded-md bg-slate-900 text-white'> Create an account</Link>
            </div>)}

          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavBar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>

        </div>
        {
          mobileDrawerOpen && (
            <div className='fixed right-0 z-20 w-full flex flex-col justify-center items-center lg:hidden bg-white pb-4'>
              <ul>
                {navItems.map((item, index) => (
                  <li key={index} className='py-4'>
                    <Link to={`${item.href}`} >
                      {item.lable}
                    </Link>
                  </li>
                ))}
              </ul>

              {isLoggedIn
                ?
                (<button onClick={Logout} className=' py-2 px-3 border rounded-md bg-slate-900 text-white '>
                  Logout
                </button>)
                :
                (<div className=" lg:flex justify-center space-x-12 items-center ">
                  <Link to="/auth/signin" className='py-2 px-3 border rounded-md'>
                    Sign in
                  </Link>

                  <Link to="/auth/signup" className='py-2 px-3 border rounded-md bg-slate-900 text-white'> Create an account</Link>
                </div>)}

            </div>
          )
        }
      </div >
    </nav >
  )
}

export default NavBar
