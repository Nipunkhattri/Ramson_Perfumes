import React, { useState, useEffect, useRef } from 'react'
import './Home.css'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import brand from '../../../assests/brand_photo.png'
import toggle from '../../../assests/toggle.png'
import brandimage1 from '../../../assests/image4.png'
import brandimage2 from '../../../assests/image5.png'
import { PerfumeBottle } from '../Helpers/PerfumeBottle';
import firstimage from '../../../assests/RED-ZX-bottle-100ml_1200x.webp'
import secondimage from '../../../assests/SECRET-CODE-bottle-100ml_1200x.webp'
import thirdimage from '../../../assests/U.R.LOVELYBOTTEL_1_1200x.webp'
import fourthimage from '../../../assests/MontesaBottle_1200x.webp'
import firstimage1 from '../../../assests/LA-OPALE-bottle-100ml_1200x.webp'
import secondimage1 from '../../../assests/Brown-Wallet-bottle-100ml_1200x.webp'
import thirdimage1 from '../../../assests/LA-FELLE-bottle-100ml_1200x.webp'
import fourthimage1 from '../../../assests/BULLET-bottle-100ml_1200x.webp'
import video from '../../../assests/brand.mp4'
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getProductBycategory } from '../../../redux/features/ProductSlice';
import { Card } from '../Helpers/Card';
export const Home = () => {
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const { product_data } = useSelector(state => state.product)

  const navigate = useNavigate();
  const perfumes = [
    { name: 'Pacific Chill', src: firstimage, price: "28,000" },
    { name: 'California Dream', src: secondimage, price: '30,000' },
    { name: 'Afternoon Swim', src: thirdimage, price: '45,089' },
    { name: 'City of Stars', src: fourthimage, price: '45,600' },
  ];

  const perfumes1 = [
    { name: 'Pacific Chill', src: firstimage1, price: "28,000" },
    { name: 'California Dream', src: secondimage1, price: '30,000' },
    { name: 'Afternoon Swim', src: thirdimage1, price: '45,089' },
    { name: 'City of Stars', src: fourthimage1, price: '45,600' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    { src: brandimage1 },
    { src: brandimage2 },
  ];


  const [params, setparams] = useState({
    Category: null,
    filter: null,
    page: 1
  })

  useEffect(() => {
    setloading(true);
    if (params?.Category != null || params.Category != "") {
      dispatch(getProductBycategory(params)).then(res => {
        console.log(res);
        if (res && res.status === 200) {
          setloading(false);
        }
      });
    }
  }, [params]);

  useEffect(() => {
    setparams({ ...params, Category: 'ShopPoints',page:1 })
  }, [])


  useEffect(() => {
    const timerId = setInterval(() => {
      handleNext();
    }, 2000);

    return () => clearInterval(timerId);
  }, [currentIndex, 2000]);

  const handleNext = () => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    const video = videoRef.current;

    // Set video attributes
    video.muted = true;
    video.autoplay = true;
    video.controls = false;

    // Ensure video fills the window (adjust styles if needed)
    video.style.width = '100%';
    video.style.height = '100vh';
    video.style.objectFit = 'cover'; // Optional: Maintain aspect ratio

    // Handle potential errors (optional)
    video.addEventListener('error', (error) => {
      console.error('Video playback error:', error);
    });

    // Cleanup on unmount
    return () => {
      video.muted = false;
      video.autoplay = false;
      video.controls = true; // Optional: Restore controls if desired
    };
  }, []);

  const handlenavigate = (name) => {
    navigate(`/products/${name}`)
  }

  return (
    <div className='container'>
      <Navbar />
      <div className='Banner'>
        {images?.map((image, index) => (
          <div
            key={index}
            className={`slider-item ${currentIndex === index ? 'active' : ''}`}
          >
            <img src={image.src} className='img_banner' />
          </div>
        ))}
      </div>
      {/* <div className="perfume-bottles">
        {product_data.map((perfume) => (
          <PerfumeBottle key={perfume.name} {...perfume} />
        ))}
      </div>
      <div className="perfume-bottles">
        {perfumes1.map((perfume) => (
          <PerfumeBottle key={perfume.name} {...perfume} />
        ))}
      </div> */}
      <div className="grid1">
        {product_data?.map((card, index) => (
          <PerfumeBottle
            key={index}
            name={card.Name}
            src={card.image}
            price={card.Price}
            discount={card.OFFPercent}
          />
        ))}
      </div>
      <div className='video'>
        <video className='videoo' ref={videoRef} src={video}></video>
      </div>
      <div className='new_arival'>
        <div className='new_container'>
          <div className='text_new'>
            <h3>SHOP BY</h3>
            <h2>New Arrivals</h2>
          </div>
          <div className='new_container_image'>
            <div style={{
              display: "flex"
            }}>
              <div className="ramsons-premium-for-men">
                <img className='image_logo' src={firstimage}></img>
                <div className="product-name">
                  <span className="product-title">Ramsons Premium For Men</span>
                </div>
                <div className="product-details">
                  <span className="size">20ml</span>
                  <div className="price-section">
                    <span className="original-price">Rs. 649.00</span>
                    <span className="discount-price">Rs. 454.00</span>
                    <span className="discount">(-30%)</span>
                  </div>
                </div>
                <button className="add-to-cart">ADD TO CART</button>
              </div>
              <div className="ramsons-premium-for-men">
                <img className='image_logo' src={secondimage}></img>
                <div className="product-name">

                  <span className="product-title">Ramsons Premium For Men</span>
                </div>
                <div className="product-details">
                  <span className="size">20ml</span>
                  <div className="price-section">
                    <span className="original-price">Rs. 649.00</span>
                    <span className="discount-price">Rs. 454.00</span>
                    <span className="discount">(-30%)</span>
                  </div>
                </div>
                <button className="add-to-cart">ADD TO CART</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='third_footer'>
      </div>
      <div className='second_footer'>
      </div>
    </div>

  )
}