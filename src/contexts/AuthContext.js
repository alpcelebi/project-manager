// AuthContextProvider.js
import React, { createContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/config';

export const AuthContext = createContext();

const initialState = {
  user: null,
  authIsReady: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        authIsReady: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        authIsReady: true,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Eğer kullanıcı varsa, dispatch ile LOGIN işlemi yapılır.
        dispatch({ type: 'LOGIN', payload: user });
      } else {
        // Eğer kullanıcı yoksa, LOGOUT işlemi yapılır.
        dispatch({ type: 'LOGOUT' });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
