import {useEffect, useState} from "react";
import {IProduct} from '../../../server/src/models/product'
import axios from "axios";
import {useGetToken} from "./useGetToken";
export const useGetPurchased = () => {
    const [purchasedItems, setPurchasedItems] = useState<IProduct[]>();
    const {headers} = useGetToken();

    const fetchPurchasedItems = async () => {
        let res;
        try {
            res = await axios.get(`http://localhost:3001/product/purchased/${JSON.parse(localStorage.getItem('user-id')!)}`, {headers})
            setPurchasedItems(res.data.purchased)
        }catch (err){
            console.log("ERROR: Something went wrong!")
        }
    }

    useEffect(()=>{
        fetchPurchasedItems()
    },[])

    return {purchasedItems}
}