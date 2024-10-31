import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Recover() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate();
    async function handleLogin(e, ) {
        e.preventDefault();
        try {
            const { data } = await axios.post('/reset', {email });
            console.log(data); 
          } catch (error) {
          console.log(error);
          }
          navigate('/');
    }
  return (
    <>
    <div className='mt-[150px]'>
    <form action="" className='max-w-md mx-auto' onSubmit={handleLogin}>
        <input type="email" placeholder='type your email' value={email} 
        onChange={e => setEmail(e.target.value)} />
        
        <button className="bg-primary p-2 w-full text-white rounded-2xl ">Send</button>
       
      </form>
    
    </div>
    
    
    </>
  )
}
