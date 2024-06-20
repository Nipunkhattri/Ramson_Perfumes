import React, { useEffect, useState } from 'react'
import './singleproduct.css'
import { Navbar } from '../Home /Navbar/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AddtointialCart, getProductById, get_most_liked } from '../../redux/features/ProductSlice'
import img1 from '../../assests/p1.avif'
import img2 from '../../assests/p2.avif'
import img3 from '../../assests/p3.avif'
import img4 from '../../assests/p4.avif'
import { PerfumeBottle } from '../Home /Helpers/PerfumeBottle';
import { Card } from '../Home /Helpers/Card'
import thirdimage from '../../assests/U.R.LOVELYBOTTEL_1_1200x.webp'
import { Writereview } from '../Home /Helpers/Writereview'
import empty from '../../assests/empty.png'
import { toast } from 'react-toastify'

const RatingStar = ({ rating }) => {
  const stars = Array(5).fill(0);

  return (
    <div className="rating">
      {stars.map((_, index) => (
        <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
          ★
        </span>
      ))}
    </div>
  );
};

export const SingleProduct = () => {
  const { id } = useParams();
  const { isAuthenticated } = useSelector(state => state.persistedReducer);
  const navigate = useNavigate();
  const { single_product } = useSelector(state => state.product);
  const { youmayliked } = useSelector(state => state.product);
  const [open, setopen] = useState(false);
  const _id = id;
  console.log(_id);
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    id: id
  })
  let QuantityYouAdd = 1;
  const [cart_data, setcartdata] = useState({
    product_name:'',
    category: '',
    price:'',
    image:'',
    id:'',
    Quantity: QuantityYouAdd
  })

  useEffect(()=>{
    setcartdata({...cart_data,product_name:single_product?.Name,category: single_product?.Category,price: single_product?.Price, image:single_product?.image,id:single_product?._id})
  },[single_product])

  const convertDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-indexed in JavaScript
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    setdata({ ...data, id: _id })
  }, [_id])

  useEffect(() => {
    if (data?.id != null) {
      console.log(data);
      dispatch(get_most_liked(data))
    }
  }, [_id])

  useEffect(() => {
    if (data?.id != null) {
      console.log(data);
      dispatch(getProductById(data))
    }
  }, [data])

  // const perfumes = [
  //   { name: 'Pacific Chill', src: firstimage, price: "28,000" },
  //   { name: 'California Dream', src: secondimage, price: '30,000' },
  //   { name: 'Afternoon Swim', src: thirdimage, price: '45,089' },
  //   { name: 'City of Stars', src: fourthimage, price: '45,600' },
  // ];



  const review = [
    { src: thirdimage, name: "Nipun", date: "13/2/2003", review: "Icon is one of my favourite perfume, and i smelled Dunhill icon on my friend, then I used his Dunhill icon, but original was too costly for me so I tried searching clones of icon absolute,then my friend send me reel of icon by em5 and I ordered few sample and all the other samples were in ok conditions and smells great but I received broken sample of icon wich I liked the most I raised this to customer support and they immediately refund me amount of that sample, then I found all the fragrance w...", rating: 3 },
    { src: thirdimage, name: "Nipun", date: "13/2/2003", review: "Icon is one of my favourite perfume, and i smelled Dunhill icon on my friend, then I used his Dunhill icon, but original was too costly for me so I tried searching clones of icon absolute,then my friend send me reel of icon by em5 and I ordered few sample and all the other samples were in ok conditions and smells great but I received broken sample of icon wich I liked the most I raised this to customer support and they immediately refund me amount of that sample, then I found all the fragrance w...", rating: 4 },
    { src: thirdimage, name: "Nipun", date: "13/2/2003", review: "Icon is one of my favourite perfume, and i smelled Dunhill icon on my friend, then I used his Dunhill icon, but original was too costly for me so I tried searching clones of icon absolute,then my friend send me reel of icon by em5 and I ordered few sample and all the other samples were in ok conditions and smells great but I received broken sample of icon wich I liked the most I raised this to customer support and they immediately refund me amount of that sample, then I found all the fragrance w...", rating: 5 },
    { src: thirdimage, name: "Nipun", date: "13/2/2003", review: "Icon is one of my favourite perfume, and i smelled Dunhill icon on my friend, then I used his Dunhill icon, but original was too costly for me so I tried searching clones of icon absolute,then my friend send me reel of icon by em5 and I ordered few sample and all the other samples were in ok conditions and smells great but I received broken sample of icon wich I liked the most I raised this to customer support and they immediately refund me amount of that sample, then I found all the fragrance w...", rating: 3 },
    { src: thirdimage, name: "Nipun", date: "13/2/2003", review: "Icon is one of my favourite perfume, and i smelled Dunhill icon on my friend, then I used his Dunhill icon, but original was too costly for me so I tried searching clones of icon absolute,then my friend send me reel of icon by em5 and I ordered few sample and all the other samples were in ok conditions and smells great but I received broken sample of icon wich I liked the most I raised this to customer support and they immediately refund me amount of that sample, then I found all the fragrance w...", rating: 3 }
  ]

  const OpenReviewPopup = () => {
    if (isAuthenticated == false) {
      console.log("hii")
      navigate('/register');
    }
    setopen(!open)
  }

  const increase = () => {
    if(single_product?.Quantity > cart_data?.Quantity){
      QuantityYouAdd = cart_data?.Quantity + 1;
    setcartdata({...cart_data,Quantity:QuantityYouAdd});
    }
    else{
      toast.error("Max Product Limit reached ...")
    }
  }
  const decrease = () => {
    if (cart_data?.Quantity > 1) {
      QuantityYouAdd = cart_data?.Quantity - 1;
      setcartdata({...cart_data,Quantity:QuantityYouAdd});
    }
  }

  console.log(cart_data)
  const AddToCart = () =>{
    if(cart_data?.product_name == '' && cart_data?.id == ''){
      toast.error("Internal server error");
      return;
    }
    dispatch(AddtointialCart(cart_data));
    toast.success('Added to cart');
  }

  return (
    <>
      {
        open ?
          <Writereview OpenReviewPopup={OpenReviewPopup} productId={_id} />
          :
          <></>
      }
      <div className={`'single-product-container' ${open ? 'blur' : ''}`}>
        <Navbar />
        <hr />
        <div className='single-product-div'>
          <div className='image-div'>
            <img src={single_product?.image} className='image'></img>
          </div>
          <div className='content-div'>
            <div className='content-div-data'>
              <h2>{single_product?.Name}</h2>
              <div className='img_p'>
                <img src={img1}></img>
                <img src={img2}></img>
                <img src={img3}></img>
                <img src={img4}></img>
              </div>
              <div className='price'>
                <h3 className='act_price'>Rs. {single_product?.Price}</h3>
                <h3 className='dis'>({(single_product?.OFFPercent)}%)</h3>
              </div>
              <div className='Add-div'>
                <div className='idi'>
                  <button className='increase' onClick={increase}>+</button>
                  <div className='number1'>{cart_data?.Quantity}</div>
                  <button className='decrease' onClick={decrease}>-</button>
                </div>
                <button className='add-btn' onClick={AddToCart}>Add To Cart</button>
              </div>
              <div className='desc'>
                <h3>🍃Fragrance: Compare the Fragrance with Icon by Alfred Dunhill.</h3>
                <h3>🍃Concentration: Eau De Parfum (EDP) with 20%-25% of Perfume Concentration.</h3>
                <h3>🍃Longevity & Lasting: 1-2 hrs of strong projection, 4-6hrs of sillage and 5-10hrs around close .</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='like'>
          <h1 className='like_head'>You May Also Like</h1>
          <div className='products_data1'>
            <div className="grid">
              {youmayliked.map((card, index) => (
                <Card
                  key={index}
                  name={card.Name}
                  src={card.image}
                  price={card.Price}
                  discount={card.OFFPercent}
                  id={card._id}
                />
              ))}
            </div>
          </div>
          <div className='write-review'>
            <div className='review-top-bar'>
              <h2 className='text-review'>{single_product?.Reviewdata.length} Reviews</h2>
              <button className='review-btn' onClick={OpenReviewPopup}>Write a review</button>
            </div>
            <div className='review-div'>
              {
                single_product?.Reviewdata.length > 0 ?
                  single_product?.Reviewdata?.map((ele) => {
                    return (
                      <div className='user-review'>
                        <img src={ele.image}></img>
                        <RatingStar rating={ele.rating} />
                        <h1>{ele.reviewerName}</h1>
                        <h1>{convertDate(ele.createdAt)}</h1>
                        <h2>{ele.reviewText}</h2>
                      </div>
                    )
                  })
                  :
                  (
                    <div className='no_product'>
                      <img src={empty} alt="Empty" />
                      <h2>No Review Found</h2>
                    </div>
                  )}
            </div>
          </div>
          <div className='third_footer'>
          </div>
          <div className='second_footer'>
          </div>
        </div>
      </div>
    </>
  )
}