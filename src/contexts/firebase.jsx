import { createContext, useContext } from "react";
import { app } from "@/firebase/firebase";
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

export const FireBaseContext = createContext([]);

const firebaseAuth = getAuth(app);

export const FireBaseProvider = (props) => {

  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  }

  return (
    <FireBaseContext.Provider value={{
        signupUserWithEmailAndPassword,     
      }}>
      {props.children}
    </FireBaseContext.Provider>
  )
}
