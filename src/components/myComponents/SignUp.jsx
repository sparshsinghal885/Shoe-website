import React, { useContext, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router-dom'

import { HashLoader } from "react-spinners"

import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/firebase.jsx";
import { createUserWithEmailAndPassword } from "firebase/auth";

import LoginContext from '@/contexts/LoginContext/LoginContext.jsx'

const SignUp = () => {

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setIsLoggedIn} = useContext(LoginContext);

  const handleSubmit = async () => {
    if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
      alert("All Fields are required")
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

      // create user object
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )
      }

      // create user Refrence
      const userRefrence = collection(fireDB, "user")

      // Add User Detail
      addDoc(userRefrence, user);

      setUserSignup({
        name: "",
        email: "",
        password: ""
      })

      setIsLoggedIn(true);
      setLoading(false);
      navigate('/')
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <Card className="mx-auto max-w-sm">
        <div className='w-full mt-4 flex justify-center'>
          {loading && <HashLoader color='#282727' />}
        </div>
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>

        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid  gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  required
                  value={userSignup.name}
                  onChange={(e) => {
                    setUserSignup({
                      ...userSignup,
                      name: e.target.value
                    })
                  }}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={userSignup.email}
                onChange={(e) => {
                  setUserSignup({
                    ...userSignup,
                    email: e.target.value
                  })
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={userSignup.password}
                required
                onChange={(e) => {
                  setUserSignup({
                    ...userSignup,
                    password: e.target.value
                  })
                }} />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SignUp
