import React, { useState } from 'react'
import './review.css'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddReview, getProductById } from '../../../redux/features/ProductSlice';

export const Writereview = ({OpenReviewPopup,productId}) => {
  const {user} = useSelector(state =>state.persistedReducer);
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    id: productId
  })
    const [reviewData, setReviewData] = useState({
        rating: 0,
        photoBase64: null,
        content: '',
        name:user?.Username,
        productId:productId
    });

    const handleStarClick = (newRating) => {
        setReviewData((prevData) => ({ ...prevData, rating: newRating }));
    };

    const handlePhotoChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setReviewData((prevData) => ({
                    ...prevData,
                    photoBase64: reader.result.replace(/^data:(.*,;base64,)/, ''),
                }));
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleContentChange = (event) => {
        setReviewData((prevData) => ({ ...prevData, content: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(reviewData);
        const res = await dispatch(AddReview(reviewData));
        if(res.status == 200){
          dispatch(getProductById(data))
          setReviewData({ rating: 0, photoBase64: null, content: '' });
          OpenReviewPopup();
        }
    };
    return (
        <div className="review-popup">
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= reviewData.rating ? 'filled' : ''}`}
              onClick={() => handleStarClick(star)}
            >
              ★
            </span>
          ))}
        </div>
        <div className="photo-upload">
          <label htmlFor="photo">Select Photo (optional):</label>
          <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} />
        </div>
        <div className="content-textarea">
          <label htmlFor="content">Write your review:</label>
          <textarea id="content" value={reviewData.content} onChange={handleContentChange} />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>)
}
