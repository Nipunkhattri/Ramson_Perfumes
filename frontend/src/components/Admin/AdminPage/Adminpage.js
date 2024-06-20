import React,{useEffect, useState} from 'react'
import './Adminpage.css'
import { useDispatch, useSelector } from 'react-redux';
import { AddCategorydata, addproductdata, getcategorydata } from '../../../redux/features/ProductSlice';
import { toast } from 'react-toastify';

export const Adminpage = () => {
    const dispatch = useDispatch();
    const {category_data} = useSelector(state => state.product);
    console.log(category_data);
    const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
    const [showAddProductPopup, setShowAddProductPopup] = useState(false);
    const [Category, setNewCategory] = useState({
        newCategory:''
    }); // New category name
    const [productForm, setProductForm] = useState({
      category: '',
      name: '',
      description: '',
      offPercent: '',
      price: '',
      quantity: '',
      image:''
    }); 

    // get all category
    useEffect(()=>{
        dispatch(getcategorydata());
    },[])
  
    const handleAddCategory = async () => {
    const len = await Category?.newCategory?.length;
      if (len != 0) { // Check for empty category name
        // add the category to api
        console.log(Category);
        await dispatch(AddCategorydata(Category))
        // setCategories([...categories, Category.newCategory]);
        // setNewCategory('');
        setShowAddCategoryPopup(false);
      } else {
        toast.error("Please add the category Name");
      }
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    };
  
    const handleAddProduct = async (e) => {
      e.preventDefault();
      // Implement product validation and Adding product api
      const file = productForm.image;
      const base64 = await convertBase64(file);
      console.log(base64);
      const updatedProductForm = { ...productForm, image: base64 };
      setProductForm(updatedProductForm);
      
      dispatch(addproductdata(updatedProductForm));
      
      console.log('Product added:', productForm);
      setProductForm({
        category: '',
        name: '',
        description: '',
        offPercent: '',
        price: '',
        quantity: '',
        image:''
      });
      setShowAddProductPopup(false);
    };
  
    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        setProductForm((prevForm) => ({
          ...prevForm,
          [name]: name === 'image' ? files[0] : value, // Handle image and other fields differently
        }));
      };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewCategory((prevData) => ({ ...prevData, [name]: value }));
      };
  return (
    <div className="App">
    <h1>Product Management</h1>

    <button className='btn1' onClick={() => setShowAddCategoryPopup(true)}>Add Category</button>

    {showAddCategoryPopup && (
      <div className="popup">
        <h2>Add Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          name='newCategory'
          value={Category.newCategory}
          onChange={handleChange}
        />
        <button className='btn1' onClick={handleAddCategory}>Add</button>
        <button className='btn1' onClick={() => setShowAddCategoryPopup(false)}>Cancel</button>
      </div>
    )}

    <button className='btn1' onClick={() => setShowAddProductPopup(true)}>Add Product</button>

    {showAddProductPopup && (
      <div className="popup">
        <h2>Add Product</h2>
        <form onSubmit={handleAddProduct}>
          <select name="category" value={productForm.category} onChange={handleInputChange}>
            <option value="">Select Category</option>
            {category_data?.map((category) => (
              <option key={category} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <input type="text" name="name" placeholder="Name" value={productForm.name} onChange={handleInputChange} required />
          <textarea name="description" placeholder="Description" value={productForm.description} onChange={handleInputChange} />
          <input type="number" name="offPercent" placeholder="OFF Percent" value={productForm.offPercent} onChange={handleInputChange} />
          <input type="number" name="price" placeholder="Price" value={productForm.price} onChange={handleInputChange} required />
          <input type="number" name="quantity" placeholder="Quantity" value={productForm.quantity} onChange={handleInputChange} />
          <label htmlFor="image">Choose Image:</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleInputChange} />
          <div className='btn_div'>
          <button className='btnn' type="submit">Add Product</button>
          </div>
        </form>
        <button className='btn1' onClick={() => setShowAddProductPopup(false)}>Cancel</button>
      </div>
    )}
  </div>
)}