import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    setUser(data)
  }, []);

  return [user];
};

export default useAuth;