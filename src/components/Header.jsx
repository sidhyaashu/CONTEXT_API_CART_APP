import {
    Navbar,
    Container,
    FormControl,
    Nav,
    Dropdown,
    Button
} from 'react-bootstrap'
import {
    FaShoppingCart
} from "react-icons/fa"
import {
    AiFillDelete
} from "react-icons/ai"
import { NavLink } from 'react-router-dom'
import { cartState } from '../config/Context'
import { FILTER_BY_SEARCH, REMOVE_FROM_CART } from '../config/Action'
const image =
  "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";


const Header = () => {
  const { state:{ cart },dispatch,productDispatch} = cartState()
  // console.log(cart[0].name)

  return (
    <Navbar bg="dark" variant="dark" style={{height:80}}>
      <Container>
        <Navbar.Brand>
            <NavLink className="navlink" to="/">Shopping Cart</NavLink>
        </Navbar.Brand>
        <Navbar.Text className="search">
            <FormControl
            style={{width:500}}
            placeholder='Search Product'
            className='m-auto'
            onChange={(e)=>{
              productDispatch({
                type:FILTER_BY_SEARCH,
                payload:e.target.value
              })
            }}
            />
        </Navbar.Text>

        <Nav>
            <Dropdown align="end"  >
                <Dropdown.Toggle variant="success">
                    <FaShoppingCart color="white" fontSize="25px"/>
                    <span>{cart.length>0?cart.length:""}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu style={{minWidth:370}}>
                    {
                      cart.length>0?(
                        <>
                        {
                          cart.map((pord)=>(
                            <div key={pord.id}>
                            <span className='cartItem' >
                              <img src={image} alt={pord.name} className='cartImage' />
                              <div className="cartItemDetails">
                                <span>{pord.name}</span>
                                <span>${pord.price.split(".")[0]}</span>
                              </div>
                              <AiFillDelete
                              fontSize="20px"
                              style={{cursor:"pointer"}}
                              onClick={()=>dispatch({
                                type:REMOVE_FROM_CART,
                                payload:pord
                              })}/>

                            </span>
                            </div>

                          ))
                        }
                        <NavLink to="/cart">
                                <Button style={{width:"95%",margin:"0 10px"}}>
                                  Go To Cart
                                </Button>
                              </NavLink>
                        </>
                      ):(
                        <span style={{padding:10}} >Cart Is empty</span>
                      )
                    }
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
