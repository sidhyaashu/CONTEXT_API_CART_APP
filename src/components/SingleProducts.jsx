import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import { cartState } from '../config/Context'
import { ADD_TO_CART, REMOVE_FROM_CART } from "../config/Action";
const image =
  "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const SingleProducts = ({ prod }) => {
  const { name, id, price, inStock, fastDelivery, rating } = prod;

  const {
    state:{cart},
    dispatch
  } = cartState()

  return (
    <div className="products">
      <Card>
        <Card.Img
          variant="top"
          
          src={image}
          alt={name}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>${price.split(".")[0]}</span>
            {fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 day delivery</div>
            )}
            <Rating rating={rating} />
          </Card.Subtitle>

          {
            cart.some(p=>p.id ===id)?(
                <Button variant="danger"
                onClick={()=>{
                    dispatch({
                        type:REMOVE_FROM_CART,
                        payload:prod
                    })
                }}
                >Remove from cart</Button>
            ):(
                <Button disabled={!inStock}
                onClick={()=>{
                    dispatch({
                        type:ADD_TO_CART,
                        payload:prod
                    })
                }}
                >
            {!inStock ? "Out of stock" : "Add to Cart"}
          </Button>
            )
          }
          
          
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProducts;
