import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import SignIn from './components/myComponents/SignIn.jsx'
import SignUp from './components/myComponents/SignUp.jsx'
import Men from './pages/Men.jsx'
import HomePage from './pages/HomePage.jsx'
import Women from './pages/Women.jsx'
import Kids from './pages/Kids.jsx'
import Contact from './pages/Contact.jsx'
import ProductInfo from './pages/ProductInfo.jsx'
import LoginContextProvider from './contexts/LoginContext/LoginContextProvider.jsx'
import CartPage from './CartPage.jsx'
import AllProducts from './pages/AllProducts.jsx'
import UserDashBoard from './pages/user/UserDashBoard.jsx'
import AdminDasBoard from './pages/admin/AdminDasBoard.jsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: '',
          element: <HomePage />,
        },
        {
          path: '/men',
          element: <Men />,
        },
        {
          path: '/women',
          element: <Women />,
        },
        {
          path: '/kids',
          element: <Kids />,
        },
        {
          path: '/contact',
          element: <Contact />,
        },
        {
          path: "/productinfo",
          element: <ProductInfo />
        },
        {
          path: "/cart",
          element: <CartPage />
        },
        {
          path: "/allproducts",
          element: <AllProducts />
        },
        {
          path: "/user-dashboard",
          element: <UserDashBoard />
        },
        {
          path: "/admin-dashboard",
          element: <AdminDasBoard />
        },
      ]
    },
    {
      path: "/auth/signin",
      element: <SignIn />
    },
    {
      path: "/auth/signup",
      element: <SignUp />
    },

  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginContextProvider>
      <RouterProvider router={router} >
      </RouterProvider>
    </LoginContextProvider>
  </React.StrictMode>,
)
