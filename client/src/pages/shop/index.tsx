import ShopCard from "../../components/shopCards/ShopCard";
import './styles.css'
import {useGetProducts} from "../../hooks/useGetProducts";
import {useContext} from "react";
import {IShopContext, ShopContext} from "../../context/shop-context";
import {Navigate} from "react-router-dom";
function ShopPage() {
    const {isAuthenticated} = useContext<IShopContext>(ShopContext);

    if (!isAuthenticated){
        return <Navigate to="/login"/>
    }
    const {productItems} = useGetProducts();




    return (
        <div className="shop">
            <h1 className="shop-title">Our goods</h1>
            <div className="cards-grid">
                <div className="grid-cards">
                    {productItems.map((item)=>{
                        return(
                            <ShopCard key={item._id} _id={item._id} productName={item.productName} price={item.price} description={item.description} imageURL={item.imageURL} stockQuantity={item.stockQuantity}/>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default ShopPage;