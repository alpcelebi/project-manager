// useLogout.js

import { useState } from "react";
import { auth, db } from '../firebase/config';
import { updateDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      const { uid } = user;

      console.log("Updating online status to false...");
      await updateDoc(doc(db, 'kullanicilar', uid), {
        online: false
      });

      console.log("Signing out...");
      await signOut(auth);

      console.log("Dispatching logout action...");
      dispatch({ type: 'LOGOUT' });

      setIsPending(false);
      setError(null);
    } catch (error) {
      console.error("Logout error:", error);
      setError(error.message);
      setIsPending(false);
    }
  };

  return { logout, error, isPending };
};
