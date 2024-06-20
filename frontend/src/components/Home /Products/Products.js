import React, { useEffect, useRef, useState } from 'react'
import '../Products/Product.css'
import { Navbar } from '../Navbar/Navbar'
import InfiniteScroll from "react-infinite-scroll-component";
import { SortButton } from '../Helpers/SortButton';
import firstimage from '../../../assests/RED-ZX-bottle-100ml_1200x.webp'
import secondimage from '../../../assests/SECRET-CODE-bottle-100ml_1200x.webp'
import thirdimage from '../../../assests/U.R.LOVELYBOTTEL_1_1200x.webp'
import fourthimage from '../../../assests/MontesaBottle_1200x.webp'
import { PerfumeBottle } from '../Helpers/PerfumeBottle';
import { PerfumeRow } from '../Helpers/PerfumeRow';
import { Card } from '../Helpers/Card';
import { useDispatch, useSelector } from 'react-redux';
import { CleanProductData, getProductBycategory } from '../../../redux/features/ProductSlice';
import empty from '../../../assests/empty.png'
import { useNavigate, useParams } from 'react-router-dom';
import Slider from "@mui/material/Slider";
import { toast } from 'react-toastify';

export const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { category } = useParams();
    const name_value = category;
    const options = [
        'All',
        'bestSeller',
        'Price_Low_to_High',
        'Price_High_to_Low',
        'date_asc'
    ];

    // Get data from redux store
    const { product_data } = useSelector(state => state.product)
    const { totalProducts } = useSelector(state => state.product)
    const { category_data } = useSelector(state => state.product);

    const [loading, setloading] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(200);
    const [selectedOption, setSelectedOption] = useState(null);
    const [range, setRange] = React.useState([0, 1000]);
    const [params, setparams] = useState({
        Category: null,
        filter: selectedValue,
        page: 1,
        minPrice: range[0],
        maxPrice: range[1]
    })

    const handleSelect = (value) => {
        setparams({ ...params, filter: value ,page:1})
    };

    const handleClick = async (option) => {
        setSelectedOption(option);
        await dispatch(CleanProductData())
        handleSelect(option)
    };

    const handlenavigate = async (name) => {
        await dispatch(CleanProductData())
        navigate(`/products/${name}`)
    }

    function handleChanges(event, newValue) {
        setRange(newValue);
    }

    const handleSliderChangeCommitted = async (event, newValue) => {
        await dispatch(CleanProductData())
        setparams({
            ...params,
            minPrice: newValue[0],
            maxPrice: newValue[1],
            page:1
        });
    };
    useEffect(() => {
        console.log(name_value);
        setparams({ ...params, Category: name_value,page:1 })
    }, [name_value])

    console.log(params);

    useEffect(() => {
        setloading(true);
        if (params?.Category == null && params.Category == "" && params?.maxPrice == '' && params?.maxPrice == null && params.minPrice == '' && params?.minPrice == null) {
            return;
        }
        dispatch(getProductBycategory(params)).then(res => {
            console.log(res);
            if (res && res.status === 200) {
                setloading(false);
            }
        });
    }, [params]);

    const fetchMoreData = async () => {
        let newpage = params?.page + 1
        setparams({ ...params, page: newpage });
    }

    return (
        <>
            <Navbar />
            <hr style={{ width: "98%" }} />
            <div className='product-navbar'>
                <div>
                    <h2 className='product-font'>Home | {category}</h2>
                </div>
            </div>
            <div className='product_details'>
                <div className='category_filter'>
                    <h2 style={{ textAlign: "center", fontSize: "18px", fontWeight: "400", }}>SORT BY</h2>
                    <hr style={{ width: "90%" }} />
                    <div className="sort-options">
                        <div className='sort-options-div'>
                            {options.map((option) => (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div
                                        className={`bullets ${selectedOption == option ? 'selected' : ''}`}
                                        onClick={handleClick}
                                    >
                                    </div>
                                    <h2 type="button" className='sort-button' onClick={() => handleClick(option)}>
                                        {option}
                                    </h2>
                                </div>
                            ))}
                        </div>
                    </div>
                    <h2 style={{ textAlign: "center", fontSize: "18px", fontWeight: "400", }}>CATEGORIES</h2>
                    <hr style={{ width: "90%" }} />
                    <div className="sort-options1">
                        <div className='sort-options-div'>
                            {category_data.map((option, index) => (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div
                                        // className={`bullets `}
                                        onClick={() => handlenavigate(option.name)}
                                    >
                                        {index + 1}
                                    </div>
                                    <h2 type="button" className='sort-button' onClick={() => handlenavigate(option.name)}>
                                        {option.name}
                                    </h2>
                                </div>
                            ))}
                        </div>
                    </div>
                    <h2 style={{ textAlign: "center", fontSize: "18px", fontWeight: "400", }}>PRICE RANGE
                    </h2>
                    <hr style={{ width: "90%" }} />
                    <div style={{ padding: "20px" }}>
                        <Slider onChangeCommitted={handleSliderChangeCommitted}
                            min={0} max={1000} value={range} onChange={handleChanges} valueLabelDisplay="auto" />
                        The price range is {range[0]} - {range[1]}
                    </div>
                </div>
                <div className='products_data'>
                    <h2>{category}</h2>
                    {product_data?.length > 0 ? (
                        <InfiniteScroll
                            dataLength={product_data.length}
                            next={fetchMoreData}
                            hasMore={product_data.length !== totalProducts}
                        >
                            <div className="grid">
                                {product_data.map((card, index) => (
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
                        </InfiniteScroll>
                    ) : (
                        loading ? (
                            <div className="loader_animation">
                                <div className="loader"></div>
                            </div>
                        ) : (
                            <div className="no_product">
                                <img src={empty} alt="Empty" />
                                <h2>No Product Found</h2>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    )
}