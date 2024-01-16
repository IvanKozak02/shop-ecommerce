import {useContext, useEffect, useState} from "react";
import {IProduct} from "../../../server/src/models/product"
import axios from "axios";
import {useGetToken} from "./useGetToken";
import {ShopContext} from "../context/shop-context";
export const useGetProducts = () =>{
    const [productItems, setProductItems] = useState<IProduct[]>([])!;
    const {headers} = useGetToken();
    const {isAuthenticated} = useContext(ShopContext)
    const fetchProducts = async () => {
        const result = async () => {
            let res;
            try {
                res = await axios.get("http://localhost:3001/product/", {headers})
            }catch (err){
                alert("Something went wrong!!!")
            }
            return res;
        }
        result().then(data=>{
            setProductItems(data?.data.products)
        })
    }


    useEffect( ()=>{
        if (isAuthenticated) {
            fetchProducts()
        }
    },[])

    return {productItems}

}