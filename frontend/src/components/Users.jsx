import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.users)
            })
    }, [filter])

    return <div className="p-5">
        <div className="text-lg font-bold">
            Users
        </div>

        <form className="w-full pt-2 pb-2">   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
            Search
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
            </div>
            <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search users..."
                required
                onChange={(e) => {
                    setFilter(e.target.value);
                }}
            />
            </div>
        </form>

        {users.map(user => <User name = {user.firstName + " " + user.lastName} user={user}/>)}

    </div>
}

const User = ({name, user}) => {
    const navigate = useNavigate();
    return <div className="flex items-center justify-between">
        <div className="flex items-center font-medium text-sm">
            <div className="flex items-center justify-center h-10 w-10 bg-blue-100 rounded-full">
                {name[0].toUpperCase()}
            </div>
            <div className="pl-3">
                {name}
            </div>
        </div>

        <div className="flex items-center">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} content={"Send Money"}/>
        </div>     
    </div>
}

export default Users;