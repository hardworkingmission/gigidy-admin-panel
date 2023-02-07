import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import authHeader from "../services/auth-header";

const useAdmin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const decoded = jwt_decode(localStorage.getItem('token'));
  console.log({decoded:decoded.id});

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/users/${decoded.id}`,{
        headers: authHeader()
      })
         .then(res=>{
            setUser(res.data.result.user)
            setLoading(false);
         })

  }, [decoded.id]);

  return [user, loading];
};

export default useAdmin;