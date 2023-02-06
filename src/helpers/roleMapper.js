import { ROLEMAPPER } from "../config/constants";

export const roleMapper = (id)=>{
    return ROLEMAPPER.find(role=>role.roleId === id).role;
}