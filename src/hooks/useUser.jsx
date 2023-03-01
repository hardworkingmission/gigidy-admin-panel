import { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";

const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/users/${userId}`,{
        headers: authHeader()
      })
         .then(res=>{
            setUser(res.data.result.user)
            setLoading(false);
         })

  }, [userId]);

  return [user, loading];
};

export default useUser;