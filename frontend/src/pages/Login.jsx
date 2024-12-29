import React, { useState } from 'react'
import axios from 'axios'
import Button from '../components/Button'
import { data, useNavigate } from "react-router-dom";

function Login() {
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formValues.email || !formValues.password){
            alert("All field are required");
            return;
        }
        console.log(formValues);
        axios.post('http://localhost:3000/api/v1/user/signin', formValues)
        .then((response) => {
            console.log(response)
            if(response.data.success){
                console.log(response.data.user.token)
                localStorage.setItem("token", response.data.user.token) 
            }
            navigate('/dashboard');
        })
        .catch((error)=> {
            alert("Failed to log in. Please check your credentials.");
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]:value});
    }

  return (
    <div className='text-center mb-2 mt-[10%]'>
        <form 
        className='flex flex-col border border-black w-[330px] mx-auto items-center justify-center gap-4 p-4 rounded-xl'
        onSubmit={handleSubmit}
        >
            <h1 className='text-xl font-bold mb-4'>Login</h1>

            <input
            name="email"
            value={formValues.email} 
            onChange={handleChange}
            type = "text"
             className='p-2 border w-full rounded-lg'
            placeholder= "Email" 
            />

            <input 
            name= "password"
            value={formValues.password}
            onChange={handleChange}
            type="password"
             className='p-2 border w-full rounded-lg'
            placeholder= "Password"
            />

            <Button 
            className="bg-gray-600 hover:bg-gray-700 w-full rounded-lg">
            Sign In
            </Button>
        </form>
    </div>
  )
}

export default Login