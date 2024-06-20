import { createSlice } from '@reduxjs/toolkit'
import * as api from '../api';
import { toast } from 'react-toastify'

const initialState = {
    product_data:[],
    totalProducts:null,
    category_data:[],
    single_product:null,
    youmayliked:[],
    cart: JSON.parse(localStorage.getItem('cart')) || []
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      AddProduct(state, action) {
        state.product_data = [...state.product_data,...action.payload.data]
        state.totalProducts = action.payload.pagination.totalProducts;
      },
      AddCategory(state,action) {
        state.category_data = action.payload.categories
      },
      AddSingleProduct(state,action){
        state.single_product = action.payload.data
      },
      AddMayLiked(state,action){
        state.youmayliked = action.payload.data
      },
      AddtointialCart(state,action){
        state.cart.push(action.payload);
        localStorage.setItem('cart', JSON.stringify(state.cart));
      },
      removeItemById: (state, action) => {
        const id = action.payload;
        state.cart = state.cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(state.cart));
      },
      CleanProductData(state,action){
        state.product_data = []
        state.totalProducts = null;
      }
    },
  });

  export const {
    AddCategory,AddProduct,AddSingleProduct,AddMayLiked,AddtointialCart,removeItemById,CleanProductData
  } = productSlice.actions;
  
  export const { reducer: productReducer } = productSlice;

  const AddCategorydata = (Category) => async (dispatch) => {
    try {
        const response = await api.addcategory(Category);
        console.log(response)
        if(response.status == 200){
            toast.success("Category Added Successfully");
        }
    } catch (error) {
        console.log(error);
        toast.error("Something is wrong");
    }
  }

  const getcategorydata = () => async (dispatch) => {
    try {
        const response = await api.getcategories();
        console.log(response);
        if(response.status == 200){
            dispatch(AddCategory(response.data))
        }
    } catch (error) {
        console.log(error);
        toast.error("Internal Server Error");
    }
  }

  const addproductdata = (updatedProductForm) => async (dispatch) =>{
    try {
        const response = await api.addProduct(updatedProductForm);
        console.log(response); 
        if(response.status == 200){
            toast.success("Product Added Successfully");
        }
    } catch (error) {
        console.log(error);
        toast.error("Internal Server Error");
    }
  }

  const getProductBycategory = (params) => async (dispatch) => {
    try {
      console.log("abcjakasncanckakscnas");
      const response = await api.getBycategory(params);
      console.log(response);
      if(response.status == 200){
        dispatch(AddProduct(response.data))
        }
      return response;
    } catch (error) {
      console.log(error);
      // toast.error("Internal Server Error");
    }
  }
  const getProductById = (data) => async(dispatch) =>{
    try {
      const response = await api.getById(data);
      console.log(response);
      if(response.status == 200){
        dispatch(AddSingleProduct(response.data))
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  }
  const get_most_liked = (data) => async(dispatch) =>{
    try {
      const response = await api.get_liked(data);
      console.log(response);
      if(response.status == 200){
        dispatch(AddMayLiked(response.data))
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  }
  const AddReview = (reviewData) => async (dispatch) =>{
    try {
      const res = await api.addreview(reviewData);
      console.log(res);
      if(res.status == 200){
        toast.success("Review Added Successfully");
        return res;
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  }

  export { AddCategorydata ,addproductdata ,getcategorydata , getProductBycategory , getProductById , get_most_liked , AddReview};

  export default productSlice.reducer;