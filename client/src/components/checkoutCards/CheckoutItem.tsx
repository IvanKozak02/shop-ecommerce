// @ts-ignore
import {IProduct} from "../../../server/src/models/product"
import './checkoutCards.css'
import {useContext} from "react";
import {ShopContext} from "../../context/shop-context";
interface Props{
    product: IProduct
}

function CheckoutItem({product}:Props) {
    const {addToCart,getCartItem, removeFromCart} = useContext(ShopContext)
    const count = getCartItem(product._id);


    return (
        <div className="checkout-item">
            <div className="checkout-container">
                <div className="checkout-left">
                    <img src={product.imageURL} alt=""/>
                </div>
                <div className="checkout-right">
                    <p className="card-item-name">{product.productName}</p>
                    <p className="card-item-price">Price: ${product.price}</p>
                    <div className="item-counts">
                        <button onClick={()=>addToCart(product._id)}>+</button>
                        <input style={{paddingLeft:"20px"}} type="number" value={count} readOnly={true}/>
                        <button onClick={()=>removeFromCart(product._id)}>-</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CheckoutItem;