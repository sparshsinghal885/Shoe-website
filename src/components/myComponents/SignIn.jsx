import React, { useState , useContext} from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router-dom'
import { auth, fireDB } from "../../firebase/firebase.jsx";
import { HashLoader } from "react-spinners"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { query, collection , where, onSnapshot} from "firebase/firestore"
import LoginContext from '@/contexts/LoginContext/LoginContext.jsx'
import toast from 'react-hot-toast'


const SignIn = () => {

  const [loading, setLoading] = useState(false);
  const {setIsLoggedIn} = useContext(LoginContext);

  // navigate 
  const navigate = useNavigate();

  // User Signup State 
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });

  const userLoginFunction = async () => {
    // validation 
    if (userLogin.email === "" || userLogin.password === "") {
      return toast.error("All Fields are required")
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
      // console.log(users.user)

      try {
        const q = query(
          collection(fireDB, "user"),
          where('uid', '==', users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => user = doc.data());
          localStorage.setItem("users", JSON.stringify(user))
          setUserLogin({
            email: "",
            password: ""
          })
          setIsLoggedIn(true);
          setLoading(false);
          if (user.role === "user") {
            navigate('/user-dashboard');
          } else {
            navigate('/admin-dashboard');
          }
        });
        return () => data;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  }


  return (
    <div className='flex justify-center items-center h-screen'>
      <Card className="w-full max-w-sm">
        <div className='w-full mt-4 flex justify-center'>
          {loading && <HashLoader color='#282727' />}
        </div>
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={userLogin.email}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
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
              value={userLogin.password}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
                  password: e.target.value
                })
              }}
              required />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={userLoginFunction}
            className="w-full">Sign in</Button>
        </CardFooter>
        <div className="my-3 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/auth/signup" className="underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default SignIn
