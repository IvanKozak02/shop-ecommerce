import {IProduct} from '../../../../server/src/models/product'

import "./shopCard.css"
import {useContext} from "react";
import {IShopContext, ShopContext} from "../../context/shop-context";
function ShopCard({_id,productName,price,description,imageURL, stockQuantity}:IProduct) {

    const {addToCart,getCartItem}  = useContext<IShopContext>(ShopContext);

    const count = getCartItem(_id);


    return (
        <div className="card-item">
            <div className="card-item-container">
                <img src={imageURL} alt=""/>
                <p className="card-item-name">{productName}</p>
                <p className="card-item-description">{description}</p>
                <p className="card-item-price">${price}</p>
                <div className="add-to-cart">
                    <button
                        className="add-to-cart-btn"
                        onClick={()=>addToCart(_id)}
                        disabled={stockQuantity === 0}>
                        Add To Cart {count > 0 && <span>({getCartItem(_id)})</span>}
                    </button>
                </div>
                <div className="stock-quantity">
                    {stockQuantity === 0 && <p>OUT OF STOCK</p>}
                </div>
            </div>
        </div>
    );
}

export default ShopCard;