import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Signup = () => {
    const navigate = useNavigate()
    if(!AuthService.getCurrentUser()){
        navigate('/');
      }
    return (
        <div>
            <p>Signup</p>
        </div>
    );
};

export default Signup;