import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const verify = () => {
    const location= useLocation()
    console.log(location.state)
    const [email]=useState(location.state)
    const navigate= useNavigate()

    useEffect(()=>
    {
        if(!email)
        {
            navigate('/')
        }
    },[email])
    
    return (
        <div>
            <h3>Please check your email to verify </h3>
        </div>
    );
};

export default verify;