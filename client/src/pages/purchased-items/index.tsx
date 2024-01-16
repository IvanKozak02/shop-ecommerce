import PurchasedCard from "../../components/purchasedCards/PurchasedCard";
import './styles.css'
import {useGetPurchased} from "../../hooks/useGetPurchased";
function PurchasedPage() {
    const {purchasedItems} = useGetPurchased()
    return (
        <div className="purchased">
            <h1 className="purchased-items">Previously Purchased Items</h1>
            <div className="purchased-items-cards">
                {purchasedItems?.map((item)=>{
                    return <PurchasedCard name={item.productName} imageURL={item.imageURL} price={item.price}/>
                })}
            </div>
        </div>
    );
}

export default PurchasedPage;