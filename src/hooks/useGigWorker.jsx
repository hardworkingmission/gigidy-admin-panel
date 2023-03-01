import { useState, useEffect } from "react";
import axios from "axios";
import authHeader from "../services/auth-header";

const useGigWorker = (gigWorkerId) => {
  const [gigWorker, setGigWorker] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/gig-workers/${gigWorkerId}`,{
        headers: authHeader()
      })
         .then(res=>{
            console.log({workerRs:res})
            setGigWorker(res.data.result)
            setLoading(false);
         })

  }, [gigWorkerId]);

  return [gigWorker, loading];
};

export default useGigWorker;