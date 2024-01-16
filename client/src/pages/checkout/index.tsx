import {useGetProducts} from "../../hooks/useGetProducts";
import {useContext} from "react";
import {ShopContext} from "../../context/shop-context";
import CheckoutItem from "../../components/checkoutCards/CheckoutItem";
import './style.css'
import {useNavigate} from "react-router-dom";

function CheckoutPage() {
    const {productItems} = useGetProducts();
    const {getCartItem, getTotalCartAmount, checkout} = useContext(ShopContext)
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();
    return (
        <div className="checkout">
            <h1>Your Cart Items</h1>
            <div className="cards">
                {productItems.map((product) => {
                    const count = getCartItem(product._id);
                    if (count !== 0) {
                        return <CheckoutItem product={product}/>
                    }
                })}
            </div>
            {
                totalAmount > 0 ? (
                    <>
                        <p className="subtotals">Subtotals: ${totalAmount}</p>
                        <div className="cart-actions">
                            <button onClick={()=>navigate('/')} className="cart-actions-btn">Continue shopping</button>
                            <button onClick={()=>checkout()} className="cart-actions-btn">Checkout</button>
                        </div>
                    </>

                ):(
                    <h1>Your Shopping Cart Is Empty</h1>
                )
            }
        </div>
    );
}

export default CheckoutPage;