import React, { useContext } from 'react'
import { User } from '../User'
import {  Navigate, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FoodPage from './FoodPage';
import AccauntNav from '../Parts/AccauntNav';
import Footer from './Footer';

export default function Account() {
    const {user, ready, setUser} =  useContext(User)
  const navigate = useNavigate();
 
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }
  
  if(!ready) {
    return 'Loading...'
  }
  
  if(ready && !user) {
    return <Navigate to={"/login"}  />
  }

  async  function logout() {
    await  axios.post('/logout')
    setUser(null)
    navigate('/'); 
    }
  return (
    <>
  
  <div className='mt-[150px] h-[100vh]'>
  <AccauntNav />
  {subpage === 'profile' && (
    <>
    <div className="text-center mt-5 max-w-lg mx-auto">
      Welcome {user?.name} <br />
      
      <button onClick={logout} className=' inline-flex uppercase gap-1 justify-center bg-primary w-[200px] mt-3 text-white font-bold py-2 px-4 rounded-full'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>

        Logout</button>
        
    </div>
   
    </>
    
  )}
    {subpage === 'food' && (
    <div className="text-center mt-5 max-w-lg mx-auto">
     <FoodPage />
    </div>
  )}
</div>

    </>
  )
}
