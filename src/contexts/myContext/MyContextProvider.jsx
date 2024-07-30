import React, { useEffect } from "react";
import MyContext from "./MyContext.jsx";
import { useState } from "react";
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
import { fireDB,storage } from "@/firebase/firebase.jsx";
import { getDownloadURL, ref } from "firebase/storage";


export default function MyContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('users'));
        user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    }, [])

    const [getAllProduct, setGetAllProduct] = useState([]);

    const getAllProductFunction = async () => {
        try {
            const q = query(
                collection(fireDB, "products"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
            });
            return () => data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllProductFunction();
    }, []);

    const getImageUrl = (path) => {
        return getDownloadURL(ref(storage, path))
    }

    return (
        <MyContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            getAllProduct,
            getAllProductFunction,
            getImageUrl,
        }}>
            {children}
        </MyContext.Provider>
    )
}
