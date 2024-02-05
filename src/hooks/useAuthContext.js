// useAuthContext.js
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context || !context.state) {
    throw new Error('AuthContext\'e erişilemedi veya kullanıcı bilgisi bulunamadı');
  }

  return context;
};
