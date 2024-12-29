import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../components/Button';
import axios from 'axios';

function TransferMoney() {

    const [amount, setAmount] = useState("");
    const token = localStorage.getItem("token");

    const location = useLocation();
    console.log(location.state.name);

    const handleClick = async() => {
        axios.put("http://localhost:3000/api/v1/account/transfer", {to: location.state.to, transferAmount: amount}, {headers: { Authorization: `Bearer ${token}`}})
        .then((res) => {
            console.log("money transfer res", res);
        })
        .catch((error) => {
            console.log(error)
        })
    }
  return (
    <div className='flex flex-col border border-black w-[330px] mx-auto  gap-4 p-4 rounded-xl'>
        <h1 className='font-bold text-3xl text-center'>Send Money</h1>
        <div className='flex gap-2 items-center justify-start'>
        <div className='w-12 h-12 bg-green-400 rounded-full'>
        </div>
        <h2 className='font-bold text-xl'>{location.state.name}</h2>
        </div>
        <label>Amount(in Rs)</label>
        <input 
        value={amount}
        onChange={(e) =>  setAmount(e.target.value)}
        className='border border-gray-500 p-2 rounded-lg' 
        placeholder='Amount' />    
        <Button className="bg-green-500 rounded-xl hover:bg-green-600" onClick={handleClick}>Send Money</Button>    
    </div>
  )
}

export default TransferMoney