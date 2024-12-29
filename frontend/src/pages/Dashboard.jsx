import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { data, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function Dashboard() {
    
    const [users, setUsers] = useState([]);
    const [balance, setBalance] = useState(0);
    const token = localStorage.getItem("token");

    const fetchUsers = async() => {
       const response = await axios.get("http://localhost:3000/api/v1/user/allUsers", { headers: { Authorization: `Bearer ${token}`}})
       const balanceResponse = await axios.get("http://localhost:3000/api/v1/account/balance", { headers: { Authorization: `Bearer ${token}`}})
        
       console.log(balanceResponse)
       if(!response.data.success){
         return ;
       }
       setUsers(response.data.user);
       setBalance(balanceResponse.data.balance);

    }

    const navigate =useNavigate();

    useEffect(()=> {
        fetchUsers();
    } , [])
  
    return (
    <div>
        <Header />
        <div className='p-4'>
            <h1>Your Balance ${balance}</h1>
            <input />
            {users.map((user, index) =>
             (
                <div key={index} className='flex justify-between mt-4'>
                    <h1>{user.email}</h1>
                    <Button 
                    className="border rounded-xl bg-gray-700"
                    onClick={()=> navigate('/transfer', {state: {to: user._id, name: user.firstName}})}
                    >Send Money
                    </Button>
                </div>
             )
             
            )}

        </div>
    </div>
  )
}

export default Dashboard