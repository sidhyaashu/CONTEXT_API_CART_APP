import { LOW_TO_HIGH } from '../config/Action'
import { cartState } from '../config/Context'
import Filters from './Filters'
import SingleProducts from './SingleProducts'
import './styles.css'


const HomePage = () => {
  const { state:{products},
  productState:{
    byStock, byFastDelivery, byRating, searchQuery, sort 
  }
} = cartState()

  const transFormProducts = ()=>{
    let sortedProducts = products;

    if(sort){
      sortedProducts = sortedProducts.sort((a,b)=>(
        sort ===LOW_TO_HIGH?a.price - b.price:b.price - a.price
      ))
    }

    if(!byStock){
      sortedProducts = sortedProducts.filter((p)=>p.inStock)
    }

    if(byFastDelivery){
      sortedProducts = sortedProducts.filter((p)=>p.fastDelivery)
    }

    if(byRating){
      sortedProducts = sortedProducts.filter((p)=>p.rating >= byRating)
    }

    if(searchQuery){
      sortedProducts = sortedProducts.filter((p)=>p.name.toLowerCase().includes(searchQuery))
    }

    return sortedProducts
  }

  return (
    <div className='home'>
      <Filters/>
      <div className="productContainer">
        {transFormProducts().map((prod)=>(
          <SingleProducts prod={prod} key={prod.id}  />
        ))}
      </div>
    </div>
  )
}

export default HomePage
