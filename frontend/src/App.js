import logo from './logo.svg';
import './App.css';
import React,{useEffect} from 'react'
import { Routes,Route} from 'react-router-dom'
import { Admin } from './components/Admin/AdminLogin/Admin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Adminpage } from './components/Admin/AdminPage/Adminpage';
import { Home } from './components/Home /HomePage/Home';
import { Products } from './components/Home /Products/Products';
import { SingleProduct } from './components/SingleProduct/SingleProduct';
import { Register } from './components/Auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { checkPersistedLogin } from './redux/features/AuthSlice';

function App() {
  const dispatch = useDispatch();

  const {isAuthenticated} = useSelector(state => state.persistedReducer);
  console.log(isAuthenticated);
  
  useEffect(() => {
    dispatch(checkPersistedLogin());
  }, [dispatch]);

  return (
    <>
    <ToastContainer />
    <Routes>
      <Route exact path='/admin_123' element={<Admin/>}/>
      <Route exact path='/admin_page' element={<Adminpage/>}/>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/products/:category' element={<Products/>}/>
      <Route exact path='/products/:category' element={<Products/>}/>
      <Route exact path='/products/:category' element={<Products/>}/>
      <Route exact path='/products/:category' element={<Products/>}/>
      <Route exact path='/products/:category' element={<Products/>}/>
      <Route exact path='/products/:category' element={<Products/>}/>
      <Route exact path='/product/:id' element={<SingleProduct/>}/>
      <Route exact path='/register' element={<Register/>}/>      
    </Routes>
    </>
  );
}

export default App;