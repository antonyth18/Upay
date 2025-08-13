import { useEffect, useState } from "react";
import axios from "axios"

const Balance = ({}) => {
    const [balance, setBalance] = useState(0);
    const config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", config)
            .then(response => {
                setBalance(response.data.balance);
            })
    })
    return <div className="flex p-5">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semi-bold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}

export default Balance;