import React, { useState } from 'react';
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useUserAuth } from '../context/UserAuthContext';


const CheckoutForm = () => {
    const apiURL = "http://localhost:4000";
    const stripe = useStripe();
    const elements = useElements();
    const { currentUser, logOut } = useUserAuth();
    const [message, setMessage] = useState(null);
   

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a Checkout Session on the server
        const response = await fetch(`http://localhost:4000/create-checkout-session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                price: 100, // Price in cents (1 dollar = 100 cents)
                currency: "usd", // Currency
                description: "Product Description" // Description of the product
            })
        });

        const session = await response.json();

        // Redirect to Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log(result.error);
            setMessage("Error occurred during payment.");
        }
    };

    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <section className='bg-gray-300 min-h-screen flex items-center justify-center'>
            <div className='bg-[#bad4f9] flex rounded-2xl shadow-lg p-5'>
                <div className=' px-16'>
                    <h2 className='text-4xl font-bold '> Make Payment </h2>
                    <p className="font-medium text-lg text-gray-500 mt-4">You signed as {currentUser && currentUser.email}</p>
                    <h2 className='text-4xl font-bold '>Product Name</h2>
                    <p className="font-medium text-lg text-gray-500 mt-4">Price: $1</p>
                    <p className="font-medium text-lg text-gray-500 mt-2">Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p className="font-medium text-lg text-gray-500 mt-2">Category: Electronics</p>
                   
                    {message && (
                        <div className="text-red-600 text-lg font-bold mb-4">
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-center">
                            <button disabled={!stripe || !elements} type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"> Pay $1</button>
                        </div>
                    </form>
                    <div className="flex justify-center">
                        <a href="/" onClick={handleLogOut} className="block w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-voilet-600 focus:outline-none focus:ring focus:border-blue-300 mt-4 text-center">
                            Log out
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CheckoutForm;
