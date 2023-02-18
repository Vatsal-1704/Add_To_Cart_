import { useEffect, useState } from 'react';
import '../App.css';
import { BsTrash } from "react-icons/bs";
import axios from 'axios';
// import firebase from 'firebase/app';
// import 'firebase/database';

function CartList({ cart }) {

    const [CART, setCART] = useState([])
    useEffect(() => {
        // setCART(cart)
        axios.get(`https://fetchdata-25670-default-rtdb.firebaseio.com/fetchdata.json`)
            .then(res => setCART(
                Object.keys(res.data).map((key) => {
                    return { ...res.data[key], id: key, quantity: 1 }
                })
            ))
            .catch(err => { console.log(err) })
    }, [cart])

    const deleteData = async(id) => {
       await axios.delete(`https://fetchdata-25670-default-rtdb.firebaseio.com/fetchdata/${id}.json`)
       .then(res => console.log("delete done"))
        // window.location.reload(false)
    };

    return (
        <div >
            {
                CART?.map((cartItem, cartindex) => {
                    return (
                        <>
                            <div className='cart'>
                                <img src={cartItem.thumbnail} width={50} />
                                <span> {cartItem.brand} </span>
                                <button className="button"
                                    onClick={() => {
                                        const _CART = CART.map((item, index) => {
                                            return cartindex === index ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
                                        })
                                        setCART(_CART)
                                    }}
                                >-</button>
                                <span> {cartItem.quantity} </span>
                                <button className="button"
                                    onClick={() => {
                                        const _CART = CART.map((item, index) => {
                                            return cartindex === index ? { ...item, quantity: item.quantity + 1 } : item
                                        })
                                        setCART(_CART)
                                    }}
                                >+</button>
                                {/* <span> Rs. {cartItem.price * cartItem.quantity} </span> */}
                                <span> Rs. {cartItem.price} </span>


                                <BsTrash onClick={() => deleteData(cartItem.id)}>Remove</BsTrash>
                            </div>
                        </>
                    )
                })
            }

            <p className='cart'> Total  <span></span>
                {
                    CART.map(item => item.price * item.quantity).reduce((total, value) => total + value, 0)
                }
            </p>
        </div >
    )
}
export default CartList