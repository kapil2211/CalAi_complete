import React from 'react';
import pay from '../images/payment_all.gif'; // Import your hurray GIF file
import { useNavigate } from 'react-router-dom';

const Failed = () => {
   
    const navigate=useNavigate();
    const handleLogOut = async () => {
       navigate("/payment");
    };

    return (
        <div className="bg-[#bad4f9] min-h-screen flex items-center justify-center">
            <div className="max-w-xl bg-white p-12 rounded-3xl shadow-lg text-center">
                <img src={pay} alt="Hurray GIF" className="mx-auto mb-6" style={{ width: '300px' }} />
                <h1 className="text-4xl font-bold mb-6">Sorry!  Try again</h1>
                <h2 className="text-2xl font-bold text-red-500 mb-6">Payment Failed</h2>
                <button 
                    onClick={handleLogOut}
                    className="bg-[#5e89ef] hover:bg-blue-600 text-white py-3 px-6 rounded-md transition duration-300 ease-in-out"
                >
                    Payment
                </button>
            </div>
        </div>
    );
}

export default Failed;
