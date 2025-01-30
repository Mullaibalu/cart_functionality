import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

function List({ cartItems, setCartItems }) {

    const navigate = useNavigate(); 
    
    const removeItemFromCart = (id) => {
      const updatedCartItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCartItems);
    };

    const increaseQuantity = (id) => {
        const updatedCartItems = cartItems.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCartItems(updatedCartItems);
      };

      const decreaseQuantity = (id) => {
        const updatedCartItems = cartItems.map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        setCartItems(updatedCartItems);
      };

      const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const discount = totalPrice * 0.1; 
      const finalPrice = totalPrice - discount;

  return <>


<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Your Cart</h2> 

        <AiOutlineClose
          size={30}
          style={{ cursor: 'pointer', color: 'red' }}
          onClick={() => navigate('/')} 
        />
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
      
        <div>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '70px',
                    height: '70px',
                    objectFit: 'cover',
                    marginRight: '10px',
                  }}
                />
                <div>
                  <h6>{item.title}</h6>
                  <p>
                    ${item.price} x {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div>
                    <button
                      className="btn btn-outline-secondary me-2"
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-danger mt-3"
                onClick={() => removeItemFromCart(item.id)}
              >
                Remove from cart
              </button>
            </li>
          ))}
        </ul>

        {/* Total Price Section */}
        {/* <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
          <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
        </div> */}

        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
            <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
            <h5>Discount (10%): -${discount.toFixed(2)}</h5>
            <h4>Final Price: ${finalPrice.toFixed(2)}</h4>
          </div>
      </div>
      )}
       
       
  </>
}

export default List