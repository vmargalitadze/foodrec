
import './App.css';
import { User, UserProvider } from './User';
import {     Route,  Routes } from "react-router-dom";
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from "./Home"
import axios from 'axios'
import Account from './Pages/Account';
import FoodPage from './Pages/FoodPage';
import FoodForm from './Pages/FoodForm';
import IndexPage from './Pages/IndexPage';
import Single from './Pages/Single'
import Favourite from './Pages/Favourite';
import Recover from './Pages/Recover';
import Users from './Pages/Users'
import ResetPassword from './Pages/resetPassword';
import SingleUser from './Pages/SingleUser';
import AdminItems from './Pages/AdminItems';
import About from './Pages/About';
axios.defaults.baseURL = "https://foodrec-p1r8.onrender.com"
// https://foodrec-p1r8.onrender.com
axios.defaults.withCredentials = true
function App() {
  return (
    <>
   <UserProvider>

    <Routes>
    <Route  path="/" element={<Home />} >  
    <Route index element={<IndexPage />} />
    <Route path='/account' element={<Account />} />
    <Route path='/account/food' element={<FoodPage />} />
    <Route path='/account/favourite' element={<Favourite />} />
    <Route path='/account/food/new' element={<FoodForm />} />
    <Route path='/admin/users' element={<Users />} />
    <Route path='/account/food/:id' element={<FoodForm />} />
    <Route path="/login"  element={ <Login  />}  />
    <Route path="/reg"  element={ <Register  />}  />
    <Route path="/single/:id"  element={ <Single  />}  />
    <Route path="/user/:id"  element={ <SingleUser  />}  />
    <Route path="/recover"  element={ <Recover  />}  />
    <Route path="/reset/:token" element={<ResetPassword />} />
    <Route path='/admin/all' element={<AdminItems />}  />
    <Route path='about' element={<About />}      />
    </Route>
    </Routes>
    
   </UserProvider>
    
    


 
   
    
    </>
  );
}

export default App;
