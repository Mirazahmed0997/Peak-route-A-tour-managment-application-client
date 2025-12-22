import { role } from "@/constants/Role";
import { adminSidebarItems } from "@/routes/AdminSidbarItems";
import { userSidebarItems } from "@/routes/UserSidebarItems";
import { TRole } from "@/types";


export const getSidebarItems =(userRole:TRole)=>
    {
        switch (userRole) {
            case role.superAdmin: 
                return[...adminSidebarItems];
            case role.admin: 
                return[...adminSidebarItems];
            case role.user: 
                return[...userSidebarItems];
        
            default:
                return [];
        }
    }