import React, { createContext, useState, useEffect } from "react";

// Create Context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(sessionStorage.getItem("role")); // Default role is 'guest'

  useEffect(() => {
    const storedRole = sessionStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return <UserContext.Provider value={{ role, setRole }}>{children}</UserContext.Provider>;
};
