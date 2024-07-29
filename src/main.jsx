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
import { FireBaseProvider } from './contexts/firebase.jsx'

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
      ]
    },
    {
      path: "/auth/signin",
      element: <SignIn />
    },
    {
      path: "/auth/signup",
      element: <SignUp />
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FireBaseProvider>
      <RouterProvider router={router} /> 
    </FireBaseProvider>
  </React.StrictMode>,
)
