import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('id');
    const name = searchParams.get('name');
    const [amount, setAmount] = useState(0);

    return <div className="bg-green-100 h-screen flex justify-center items-center ">  
        <div className="shadow-lg w-96 h-50 flex flex-col justify-center bg-white p-6 rounded-lg">
            <h1 className="text-h1-custom font-bold">Send Money</h1>

            <div className="p-6"></div>

            <div className="flex">
                <div className="flex items-center justify-center text-white h-10 w-10 bg-green-500 rounded-full">
                    {name[0]}
                </div>

                <h2 className="text-h2-custom font-semibold pl-2">
                    {name}
                </h2>
            </div>

            <div className="font-medium pt-2 pb-2">
                Amount (in Rs)
            </div>

            <input onChange={(e) => {
                setAmount(e.target.value)
            }} type="text" id="first_name" className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Enter amount" required />
            <div className="p-2"></div>
            <button onClick={async (e) => {
                await axios({
                    url: "http://localhost:3000/api/v1/account/transfer",
                    method: "POST",
                    data: {
                        amount: Number(amount),
                        to: userId
                    },
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });

            }} type="button" className="w-90 focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Initiate Transfer</button>

        </div>
    </div>
}

export default SendMoney

