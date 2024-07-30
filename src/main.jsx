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
import MyContextProvider from './contexts/myContext/MyContextProvider.jsx'
import CartPage from './pages/CartPage.jsx'
import AllProducts from './pages/AllProducts.jsx'
import UserDashBoard from './pages/user/UserDashBoard.jsx'
import AdminDasBoard from './pages/admin/AdminDasBoard.jsx'
import AddProductPage from './pages/admin/AddProductPage.jsx'
import UpdateProductPage from './pages/admin/UpdateProductPage.jsx'
import ProtectedRouteForAdmin from './protectedRoutes/ProtectedRouteForAdmin.jsx'
import ProtectedRouteForUser from './protectedRoutes/ProtectedRouteForUser.jsx'

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
          element: (
            <ProtectedRouteForUser>
              <UserDashBoard />
            </ProtectedRouteForUser>
          )
        },
        {
          path: "/admin-dashboard",
          element: (
            <ProtectedRouteForAdmin>
              <AdminDasBoard />
            </ProtectedRouteForAdmin>
          )
        },
        {
          path: "/addproduct",
          element: (
            <ProtectedRouteForAdmin>
              <AddProductPage />
            </ProtectedRouteForAdmin>
          )
        },
        {
          path: "/updateproduct/:id",
          element: (
            <ProtectedRouteForAdmin>
              <UpdateProductPage />
            </ProtectedRouteForAdmin>
          )
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
    <MyContextProvider>
      <RouterProvider router={router} >
      </RouterProvider>
    </MyContextProvider>
  </React.StrictMode>,
)
