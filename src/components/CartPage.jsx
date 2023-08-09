import { useEffect, useState } from 'react'
import { cartState } from '../config/Context'
import {
  Button,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap"
import Rating from './Rating'
import { AiFillDelete } from 'react-icons/ai';
import { CHANGE_CART_QTY, REMOVE_FROM_CART } from '../config/Action';
const image =
  "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";





const CartPage = () => {
  const {state:{cart},dispatch} = cartState()
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(cart.reduce((acc,curr)=>acc + Number(curr.price)*curr.qty,0))
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {
            cart.map((p)=>(
              <ListGroup.Item key={p.id} >
                <Row>
                  <Col md={2}>
                    <Image src={image} fluid rounded/>
                  </Col>
                  <Col md={2}>
                    <span>{p.name}</span>
                  </Col>
                  <Col md={2}>
                    <span>${p.price}</span>
                  </Col>
                  <Col md={2}>
                    <Rating rating={p.rating}/>
                  </Col>
                  <Col md={2}>
                    <Form.Control as="select" value={p.qty}
                    onChange={(e)=>dispatch({
                      type:CHANGE_CART_QTY,
                      payload:{
                        id:p.id,
                        qty:e.target.value
                      }
                    })}
                    >
                      {
                        [...Array(p.inStock).keys()].map((x)=>(
                          <option key={x+1}>{x+1}</option>
                        ))
                      }

                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                    type="button"
                    variant='light'
                    onClick={()=>dispatch({
                      type:REMOVE_FROM_CART,
                      payload:p
                    })}
                    >
                      <AiFillDelete fontSize={"20px"}/>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) item</span>
        <span style={{fontWeight:700,fontSize:20}} >Total: ${total}</span>

        <Button type="button" disabled={cart.length === 0}>
          Proceed to chakeout
        </Button>
      </div>
    </div>
  )
}

export default CartPage
