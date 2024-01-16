import {createContext, useState} from "react";

export interface IShopContext {
    addToCart: (itemId: string) => void,
    removeFromCart: (itemId: string) => void,
    updateCartItemCount: (newAmount: number, itemId:string) => void
    getCartItem: (itemId: string) => number
}

const defaultVal: IShopContext = {
    addToCart: () => null,
    removeFromCart: () => null,
    updateCartItemCount: ()=>null,
    getCartItem: ()=> 0
}

const [cartItems, setCarItems] = useState<{string: number} | {}>({})!;

const getCartItem = (itemId: string): number => {
    if (itemId in cartItems){
        // @ts-ignore
        return cartItems[itemId];
    }
    return 0;
}

const addToCart = (itemId:string) => {
    // @ts-ignore
    if (!cartItems[itemId]){
        setCarItems(prevState => ({...prevState, [itemId]: 1}))
    }
    else {
        // @ts-ignore
        setCarItems(prevState => ({...prevState,[itemId]: prevState[itemId] + 1}))
    }
}

const removeFromCart = (itemId:string) => {

}
const updateCartItemCount =(newAmount: number, itemId:string)=>{

}

const contextValues: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getCartItem
}




export const ShopContext = createContext<IShopContext>(defaultVal)

export const ShopContextProvider = ({children}:any) => {
    return <ShopContext.Provider value={contextValues}>
        {children}
    </ShopContext.Provider>
}