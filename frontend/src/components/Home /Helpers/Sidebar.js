import React from 'react'
import './Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemById } from '../../../redux/features/ProductSlice';
import empty from '../../../assests/empty.png'
import axios from 'axios';
import { toast } from 'react-toastify';

export const Sidebar = ({ isOpen, toggleSidebar }) => {
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.product);
    const { user } = useSelector(state => state.persistedReducer);
    const handleRemoveItem = (id) => {
        dispatch(removeItemById(id));
    };
    const token = localStorage.getItem('token');
    let TotalCost = 0;
    for(let i=0;i<cart.length;i++){
        TotalCost += cart[i].price;
    }

    const handlePayment = async () => {
        try {
            if(TotalCost == 0){
                toast.error("Please Add Something to Cart");
                return;
            }
            const orderUrl = 'http://localhost:5000/api/checkout';
            const order = await axios.post(orderUrl, {
                amount: TotalCost
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const options = {
                key: 'rzp_test_mraqLf5mzJkKdQ',
                amount: order.data.order.amount,
                order_id: order.data.order.id,
                handler: async (response) => {
                    const verifyUrl = 'http://localhost:5000/api/verification';
                    const data = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    };

                    const result = await axios.post(verifyUrl, data, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log(result);
                    if (result.status === 200) {
                        const combinedData = {
                            user,
                            cart,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id:response.razorpay_payment_id
                        };

                        console.log(combinedData)

                        const order_res = await axios.post('http://localhost:5000/api/save_order', combinedData, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        if(order_res.status == 200){
                            toggleSidebar();
                            toast.success("Order Placed Successfully");
                        }
                        else{
                            toast.error("Something Went Wrong");
                        }
                    } else {
                        alert('Payment verification failed');
                    }
                },
                theme: {
                    color: '#F37254'
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            toast.error("Please Login again !")
            console.error('Error in payment', error);
        }
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={toggleSidebar}>X</button>
            <hr />
            <h1 className='cart-heading'> Shopping Bag </h1>
            <div className='cart_container'>
                {
                    cart.length > 0 ? cart?.map((ele) => {
                        return (
                            <div className='cart_bag'>
                                <button className="remove-product" onClick={() => handleRemoveItem(ele?.id)}>X</button>
                                <img className='cart_img' src={ele?.image}></img>
                                <div className='cart_data'>
                                    <h1>{ele?.product_name}</h1>
                                    <h2> Category : {ele?.category}</h2>
                                    <h2>Quantity : {ele?.Quantity}</h2>
                                    <h2>Rs. {ele?.price}</h2>
                                </div>
                            </div>
                        )
                    })
                        :
                        (
                            <div className='no_product'>
                                <img src={empty} className='cart_empty' alt="Empty" />
                                <h2>Cart is Empty !</h2>
                            </div>
                        )
                }
            </div>
            <hr />
            <div className='price_total'>
                <h3>SubTotal:{TotalCost}</h3>
                <button className='buy_btn' onClick={handlePayment}>PROCEED TO PURCHASE</button>
            </div>
        </div>)
}
