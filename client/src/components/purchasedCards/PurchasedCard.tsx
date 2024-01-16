import './purchasedCard.css'
interface IProps{
    name: string,
    imageURL: string,
    price: number
}

function PurchasedCard({name,imageURL, price}:IProps) {
    return (
        <div className="purchased-card">
            <div className="purchased-card-container">
                <h3 className="purchased-card-title">{name}</h3>
                <div className="purchased-card-img">
                    <img src={imageURL} alt=""/>
                </div>
                <h3 className="purchased-card-price">${price}</h3>
                <button>Purchase Again</button>
            </div>
        </div>
    );
}

export default PurchasedCard;