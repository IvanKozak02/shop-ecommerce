import {useCookies} from "react-cookie";

export const useGetToken =()=>{
    const [cookies,_] = useCookies(['access-token'])
    return {headers: {authorization: cookies["access-token"]}}
}