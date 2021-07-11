import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../App';


const CheckOut = () => {
    
    const { register, handleSubmit, watch, formState: { errors }} = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [order, setOrder] = useState({});
    console.log(order);

    useEffect(() => {
        fetch(`http://localhost:5055/order`)
        .then(res => res.json())
        .then(data =>setOrder(data[0]))
    }, [])

    
    const onSubmit = data => {
        const orderDetails = {...loggedInUser, product: order, shipment: data, orderTime: new Date()};

            const url = `http://localhost:5055/addOrder`
            fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderDetails)
            })
            .then(res => res.json())
            .then(data => {
                if(data){
                    alert('Your order placed successfully');
                }
            })
           
    };

    return (
        
            <React.Fragment>
            <h3 className="text-center text-4xl font-semibold mt-10">Placed your order here</h3>
            <form className="max-w-xl m-auto py-10 mt-10 px-12 border" style={{ maxWidth: "450px"}} onSubmit={handleSubmit(onSubmit)}>
                <label className="text-gray-600 mt-4">Name</label>
                <input className="border-solid border-gray-500 border py-2 px-6 w-100
                rounded text-gray-700" defaultValue="" {...register("name")} />
                <br />
                <label className="text-gray-600 mt-4">Email</label>
                <input className="border-solid border-gray-500 border py-2 px-6 w-100
                rounded text-gray-700" defaultValue="" {...register("email")} />
                <br />
                <label className="text-gray-600 mt-4">Address</label>
                <input className="border-solid border-gray-500 border py-2 px-6 w-100
                rounded text-gray-700" defaultValue="" {...register("address")} />
                <br />
                <label className="text-gray-600 mt-4">Phone number</label>
                <input className="border-solid border-gray-500 border py-2 px-6 w-100 
                rounded text-gray-700" defaultValue="" {...register("phone")} />
                <br />
                {errors.defaultValue && <span>This field is required</span>}
                <button className="mt-4 w-100 btn btn-success hover:bg-green-600 text-green-100 border py-3 px-6 font-semibold text-md rounded"
                type="submit">Placed Order</button>
            </form>
            </React.Fragment>
        
    );
};

export default CheckOut;