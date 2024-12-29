import React, { useState } from 'react'
import Button from '../components/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {

    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    function handleChange(e) {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }
    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:3000/api/v1/user/register', formValues)
        .then((res) => {
            console.log(res);
            navigate('/login');
        })
        .catch((error)=> {
            console.log("Error", error);
        })
    }

  return (
    <div>
        <div className='mt-[10%]'>
            <form 
            onSubmit={handleSubmit}
            className='flex flex-col border border-black w-[330px] mx-auto items-center justify-center gap-4 p-4 rounded-xl'
            >
            <h1 className='text-xl font-bold mb-4'>Sign Up</h1>
                <input 
                className='p-2 border w-full rounded-lg'
                name = "firstName"
                type = "text"
                value = {formValues.firstName}
                onChange = {handleChange}
                placeholder="First Name"
                />
                <input 
                className='p-2 border w-full rounded-lg'
                name = "lastName"
                type = "text"
                value = {formValues.lastName}
                onChange = {handleChange}
                placeholder= "Last Name"
                />
                <input 
                className='p-2 border w-full rounded-lg'
                name = "email"
                type = "text"
                value = {formValues.email}
                onChange = {handleChange}
                placeholder= "Email"
                />

                <input
                className='p-2 border w-full rounded-lg' 
                name= "password"
                type = "password"
                value = {formValues.password}
                onChange = {handleChange}
                placeholder= "Password"
                />
                <Button className="bg-gray-600 hover:bg-gray-700 w-full rounded-lg">
                    Sign Up
                </Button>

            </form>
        </div>
    </div>
  )
}

export default SignUp