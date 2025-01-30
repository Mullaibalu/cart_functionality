import React,{useState} from 'react'
// import ReactStars from "react-rating-stars-component";
function Productlist({cart,setCart,cartItems,setCartItems,product={}}) {
    
   

    // const add = (product) => {
    //     const isProductInCart = cartItems.some((item) => item.id === product.id);
    
    //     if (isProductInCart) {
    //       alert("Item already added to the cart");
    //     } else {
    //       setCart(cart + 1);
    //       setCartItems([...cartItems, product]);
    //     }
    //   };

      const add = (product) => {
        // Check if the product is already in the cart
        const existingItem = cartItems.find((item) => item.id === product.id);
    
        if (existingItem) {
          // If it exists, increment the quantity
          const updatedCartItems = cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          setCartItems(updatedCartItems);
        } else {
          // If it doesn't exist, add it with quantity 1
          setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
      };

      
  return <>
  <div className="col mb-5">
    <div className="card h-100">
        <div className="badge bg-dark text-white position-absolute" style={{top: "0.5rem", right: "0.5rem"}}>Sale</div>
        <img className="card-img-top" src={product.image} alt="..." />
        <div className="card-body p-4">
            <div className="text-center">
                <h5 className="fw-bolder">{product.title}</h5>
                <div className="d-flex justify-content-center small text-warning mb-2">
                    {/* <ReactStars
                        count={5}
                        size={24}
                        activeColor="red"
                        value={product.rating.rate}
                    /> */}
                </div>
                <span>${product.price}</span>
                {/* &nbsp;
                ${(product.price * 0.8).toFixed(2)} */}
            </div>
            {/* <div>{product.description}</div> */}
        </div>
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            {
                <div className="text-center"><a className="btn btn-outline-dark mt-auto" onClick={()=>add(product)}>Add to cart</a></div> 
            }
        </div>
    </div>
    </div>
  </>
}

export default Productlist