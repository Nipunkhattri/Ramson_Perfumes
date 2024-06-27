import React, { useEffect,useState } from 'react'
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
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { CleanProductData, getcategorydata } from '../../../redux/features/ProductSlice';
import { Sidebar } from '../Helpers/Sidebar';
import './Navbar.css'
import { CiLogout } from "react-icons/ci";
import { toast } from 'react-toastify';

export const Navbar = () => {
    const dispatch = useDispatch()
    const {category_data} = useSelector(state => state.product);
    const {user} = useSelector(state =>state.persistedReducer);
    console.log(category_data);
    const navigate = useNavigate();
    const handlenavigate = async (name)=>{
        await dispatch(CleanProductData())
        navigate(`/products/${name}`)
    }
    const handlenavigatehome = async() =>{
        navigate('/')
    }
    useEffect(()=>{
        dispatch(getcategorydata());
    },[])

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handlelogin = () =>{
        navigate('/register')
    }

    const handleLogout = () =>{
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.reload();
        toast.success("Logout Successfully");
    }

    return (
        <>
            <div className='TopBar'>
                <div className='contact'>
                    Call +916386457657
                </div>
                <div className='mid-text'>
                    Flat 25% Off On Every Purchase & 30% Off On 100ml Perfumes
                </div>
                <div className='icons'>
                    <FaFacebookF style={{ marginRight: "10px" }} />
                    <FaInstagram style={{ marginRight: "10px" }} />
                    <FaTwitter style={{ marginRight: "10px" }} />
                    <FaYoutube style={{ marginRight: "10px" }} />
                </div>
            </div>
            <div className='Navbar'>
                <div className='toggle'>
                    {/* <FaToggleOff style={{fontSize:"40px"}}/> */}
                    <img src={toggle} className='toogle_img'></img>
                </div>
                <div className='Brand' onClick={handlenavigatehome}>
                    <img src={brand} className='brand_img'></img>
                </div>
                <div className='asc'>
                    {
                        user?
                        <button className='Profile_btn'>
                            <h1>{user?.Username.charAt(0)}</h1>
                        </button>
                        :
                        <CgProfile style={{ fontSize: "25px", marginRight: "10px" }} onClick={handlelogin}/>
                    }
                    <CiSearch style={{ fontSize: "25px", marginRight: "10px" }} />
                    <IoCartOutline style={{ fontSize: "25px", marginRight: "10px" }} onClick={toggleSidebar}/>
                    {
                        user?
                        <CiLogout style={{ fontSize: "25px", marginRight: "10px" }} onClick={handleLogout}/>
                        :
                        <></>
                    }
                </div>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </div>
            <div className='categories'>
                <div className='category_data'>
                    {
                        category_data?.map((data)=>{
                            return(
                                <p onClick={()=>handlenavigate(data.name)}>{data.name}</p>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}