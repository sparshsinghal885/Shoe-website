import React, { useEffect } from "react";
import MyContext from "./MyContext.jsx";
import { useState } from "react";
import { query, collection, onSnapshot, orderBy, doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { fireDB, storage } from "@/firebase/firebase.jsx";
import { getDownloadURL, ref } from "firebase/storage";

export default function MyContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [getAllUser, setGetAllUser] = useState([]);
  const [getAllOrder, setGetAllOrder] = useState([]);
  const [getAllProduct, setGetAllProduct] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('users'));
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [])

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

  const getAllOrderFunction = async () => {
    try {
      const q = query(
        collection(fireDB, "order"),
        orderBy('time')
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let orderArray = [];
        QuerySnapshot.forEach((doc) => {
          orderArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllOrder(orderArray);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  }

  const getAllUserFunction = async () => {
    try {
      const q = query(
        collection(fireDB, "user"),
        orderBy('time')
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let userArray = [];
        QuerySnapshot.forEach((doc) => {
          userArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllUser(userArray);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUserFunction()
    getAllProductFunction();
    getAllOrderFunction();
  }, []);

  const getImageUrl = async (path) => {
    return await getDownloadURL(ref(storage, path))
  }

  const deleteOrder = async (id) => {
    try {
      await deleteDoc(doc(fireDB, 'order', id))
      getAllOrderFunction();
    } catch (error) {
      console.log(error)
    }
  }

  const deleteItemFromOrder = async (orderId, itemId) => {
    try {
      const orderDocRef = doc(fireDB, 'order', orderId);
      const orderDoc = await getDoc(orderDocRef);
      if (!orderDoc.exists()) {
        console.log('No such document!');
        return;
      }

      const orderData = orderDoc.data();
      const updatedCartItems = orderData.cartItems.filter(item => item.id !== itemId);
      if (updatedCartItems.length === 0) {
        deleteOrder(orderId)
        return;
      }
      await updateDoc(orderDocRef, {
        cartItems: updatedCartItems
      });
      getAllOrderFunction();
    } catch (error) {
      console.error("Error deleting item from order: ", error);
    }
  };

  return (
    <MyContext.Provider value={{
      getAllUser,
      deleteItemFromOrder,
      isLoggedIn,
      setIsLoggedIn,
      getAllProduct,
      getAllProductFunction,
      getImageUrl,
      getAllOrder,
    }}>
      {children}
    </MyContext.Provider>
  )
}
