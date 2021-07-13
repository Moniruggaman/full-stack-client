import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";

const AddProducts = () => {

    const [imageURL, setImageURL] = useState({});
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
    const onSubmit = data => {
        console.log(data);
        const productData = {
            name: data.name,
            imageURL: imageURL,
            price: data.price,
            quantity: data.quantity
        };
        console.log(productData);
        const newProduct = { ...productData };
        const url = `https://click-valley.herokuapp.com/addProducts`
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => console.log(data))

    };

    const handleImageUpload = events => {
        console.log(events.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '77ae46d28b8f1c77aa82b07805f91ca4');
        imageData.append('image', events.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (

        <React.Fragment>
            <h3 className="text-center text-4xl font-semibold mt-10">Adding products to server</h3>
            <form className="max-w-xl m-auto py-10 mt-10 px-12 border" style={{ maxWidth: "600px" }} onSubmit={handleSubmit(onSubmit)}>
                <label className="text-gray-600 mt-4">Product Name</label>
                <input className="border-solid border-gray-500 border py-2 px-6 w-100
                rounded text-gray-700" defaultValue="" {...register("name")} />
                <br />
                <label className="text-gray-600 mt-4">Price</label>
                <input className="border-solid border-gray-500 border py-2 px-6 w-100
                rounded text-gray-700" defaultValue="$" {...register("price")} />
                <br />
                <label className="text-gray-600 mt-4">Quantity</label>
                <input className="border-solid border-gray-500 border py-2 px-6 w-100
                rounded text-gray-700" defaultValue="1" {...register("quantity")} />
                <br />
                <label className="text-gray-600 mt-4">File Upload</label>
                <input className="border-solid border-gray-500 border py-2 px-6 w-100 
                rounded text-gray-700" defaultValue="" type="file" onChange={handleImageUpload} />
                <br />
                {errors.defaultValue && <span>This field is required</span>}
                <input className="mt-4 w-100 btn btn-success hover:bg-green-600 text-green-100 border py-3 px-6 font-semibold text-md rounded"
                    type="submit" />
            </form>
        </React.Fragment>

    );
};

export default AddProducts;