import './App.css'

import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './components/HomePage'
import CartPage from './components/CartPage'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <div>
      <Routes>
        <Route path='/' exact element={<HomePage/>} />
        <Route path='/cart' element={<CartPage/>} />
      </Routes>
    </div>
      
    </BrowserRouter>
  )
}

export default App
