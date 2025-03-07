import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, getOrders } from "@/lib/appwrite"; // Ensure `getOrders` is correctly implemented

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      try {
        const res = await getCurrentUser();
        if (res) {
          setIsLogged(true);
          setUser(res);

          // Fetch orders after user is authenticated
          const userOrders = await getOrders(res.$id, res.role);
          setOrders(userOrders);
        } else {
          setIsLogged(false);
          setUser(null);
          setOrders([]); // Clear orders when user logs out
        }
      } catch (error) {
        console.error("Error fetching user or orders:", error);
        setIsLogged(false);
        setUser(null);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndOrders();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ 
        isLogged,
        setIsLogged,
        user,
        setUser,
        isLoading,
        orders,
        setOrders, // Exposing setOrders so UI can update dynamically
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
