import { useUserProfileQuery } from "@/redux/features/auth/auth.api";
import { TRole } from "@/types";
import { ComponentType } from "react";
import { Navigate } from "react-router";

const withAuth = (Component: ComponentType,requiredRole?:TRole) => {
    return function AuthWrapper(){
        const { data,isLoading } = useUserProfileQuery(undefined)
        if(!isLoading && !data?.data?.data?.email)
            {
                return <Navigate to="/login"/>
            }
        if(requiredRole &&!isLoading && requiredRole!==data?.data?.data?.role)
            {
                return <Navigate to="/unAuthorised" />
            }    
        return <Component/>;
    }
};

export default withAuth;