import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
    const { token, userId } = useParams();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function newPassword(e) {
        e.preventDefault();
        try {
          const response =  await axios.post('/new-password', { password, token, userId });
           
            console.log("dsadsa", response ); 
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mt-[150px]">
            <form className='max-w-md mx-auto' onSubmit={newPassword}>
                <input
                    type="password"
                    placeholder='Type your new password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="bg-primary p-2 w-full text-white rounded-2xl">Reset Password</button>
            </form>
        </div>
    );
}
