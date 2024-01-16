import {createContext, useEffect, useState} from "react";
import {useGetProducts} from "../hooks/useGetProducts";
import {IProduct} from "../../../server/src/models/product"
import axios from "axios";
import {useGetToken} from "../hooks/useGetToken";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

export interface IShopContext {
    addToCart: (itemId: string) => void,
    removeFromCart: (itemId: string) => void,
    // updateCartItemCount: (newAmount: number, itemId: string) => void
    getCartItem: (itemId: string) => number
    getTotalCartAmount: () => number
    checkout: () => void,
    availableMoney: number,
    isAuthenticated: boolean,
    setIsAuthenticated: (isAuthenticated: boolean) => void
}

const defaultVal: IShopContext = {
    addToCart: () => null,
    removeFromCart: () => null,
    // updateCartItemCount: () => null,
    getCartItem: () => 0,
    getTotalCartAmount: () => 0,
    checkout: () => null,
    availableMoney: 0,
    isAuthenticated: false,
    setIsAuthenticated: () => null
}
export const ShopContext = createContext<IShopContext>(defaultVal)

export const ShopContextProvider = ({children}: any) => {
    const [cartItems, setCartItems] = useState<{ string: number } | {}>({});
    const {productItems} = useGetProducts();
    const {headers} = useGetToken();
    const navigate = useNavigate();
    const [availableMoney, setAvailableMoney] = useState<number>(0)
    const [cookies, _] = useCookies();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(cookies['access-token'] !== null);
    const getCartItem = (itemId: string): number => {
        if (itemId in cartItems) {
            return cartItems[itemId];
        }
        return 0;
    }

    const addToCart = (itemId: string) => {
        if (!cartItems[itemId]) {
            setCartItems(prevState => ({...prevState, [itemId]: 1}))
        } else {

            setCartItems(prevState => ({...prevState, [itemId]: prevState[itemId] + 1}))
        }
    }

    const removeFromCart = (itemId: string) => {
        if (cartItems[itemId] > 0) {
            setCartItems(prevState => ({...prevState, [itemId]: prevState[itemId] - 1}))
        }
    }
    // const updateCartItemCount = (newAmount: number, itemId: string) => {
    //
    // }

    const getTotalCartAmount = (): number => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const product: IProduct = productItems.find((product) => {
                    return product._id === item
                })!
                totalAmount += product?.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const checkout = async () => {
        const customerID = JSON.parse(localStorage.getItem('user-id')!);
        const checkoutBody = {
            customerID,
            cartItems
        }
        let res;
        try {
            res = await axios.post("http://localhost:3001/product/checkout", checkoutBody, {headers})
        } catch (err) {
            console.log(err);
        }
        console.log(res?.data)
        setCartItems({})
        await fetchUserAvailableMoney()
        navigate('/')
    }

    const fetchUserAvailableMoney = async () => {
        try {
            if (isAuthenticated) {
                const res = await axios.get(`http://localhost:3001/user/available-money/${JSON.parse(localStorage.getItem('user-id')!)}`, {headers})
                setAvailableMoney(res.data.availableMoney)
            }
        } catch (err) {
            alert("ERROR: Something went wrong")
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserAvailableMoney()
        }
    }, [])

    const contextValues: IShopContext = {
        addToCart,
        removeFromCart,
        getCartItem,
        getTotalCartAmount,
        checkout,
        availableMoney,
        isAuthenticated,
        setIsAuthenticated
    }

    return <ShopContext.Provider value={contextValues}>
        {children}
    </ShopContext.Provider>
}