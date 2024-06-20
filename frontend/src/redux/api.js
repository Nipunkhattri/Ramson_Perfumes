import axios from 'axios';

const Api = axios.create({
    baseURL :"http://localhost:5000/"
    // baseURL:"https://3e69-103-83-70-78.ngrok-free.app/"
})
  
const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return null; 
    }
    return token;
};
  
// Add bearer token to headers if available
Api.interceptors.request.use(config => {
const token = getToken();
if (token) {
    config.headers.Authorization = `Bearer ${token}`;
}
return config;
});

export const login = (data) => Api.post('/auth/login',data);
export const register = (register_credentials) => Api.post('/auth/register',register_credentials);
export const addcategory = (Category) => Api.post('/admin/create_category',Category);
export const getcategories = () => Api.get('/api/get_all_category');
export const addProduct = (productForm) => Api.post('/admin/create_product',productForm);
export const getBycategory = (params) => Api.get('/api/get_by_category',{params});
export const getById = ({id}) => Api.get('/api/get_by_Id',{params:{id:id}});
export const get_liked = ({id}) => Api.get('/api/liked_by_id',{params:{id:id}});
export const addreview = (reviewData) => Api.post('/api/add_review',reviewData);