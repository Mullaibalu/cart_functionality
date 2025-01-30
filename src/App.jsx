import React, { useEffect, useState } from 'react'
import Nav from './components/Nav'
import List from './components/List'
import { Routes, Route} from 'react-router'
import Productlist from './components/Productlist'

function App() {
  let [product,setProduct] = useState([])
  let [cartItems, setCartItems] = useState([]);
  let [cart,setCart] = useState(0)


  const getData = ()=>{
    fetch('https://fakestoreapi.com/products?limit=5')
    .then(res=>res.json())
    .then(data=>setProduct(data))
    .catch(error=>console.error(error.message || error))
  }


  useEffect(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCart(totalItems);
  }, [cartItems]);

  useEffect(()=>{
    getData()
  },[])

  return <>
  {/* <Router> */}
     <Nav cart={cart} />

     <Routes>
        <Route
          path="/"
          element={
            <section className="py-5">
              <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                  {product.map((e) => (
                    <Productlist
                      cart={cart}
                      setCart={setCart}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                      product={e}
                      key={e.id}
                    />
                  ))}
                </div>
              </div>
            </section>
          }
        />

        <Route
          path="/cart"
          element={
            <List
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
      </Routes>
  </>
}

export default App