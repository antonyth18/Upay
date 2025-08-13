import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Subheading from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">  
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-96 px-6">
                <Heading heading= {"Sign Up"}/>
                <Subheading subheading = {"Enter your information to create an account"}/>
                <div className="p-2"></div>
                <InputBox onChange = {(e) => {
                    setFirstName(e.target.value);
                }} label= {"First Name"} placeholder= {"John"}/>
                <InputBox onChange = {(e) => {
                    setLastName(e.target.value);
                }} label= {"Last Name"} placeholder= {"Doe"}/>
                <InputBox onChange = {(e) => {
                    setUsername(e.target.value);
                }} label= {"Email"} placeholder= {"johndoe@org.com"}/>
                <InputBox onChange = {(e) => {
                    setPassword(e.target.value);
                }} label= {"Password"} placeholder= {"jdisgoat"}/>
                <div className="p-2"></div>
                <Button onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        username,
                        firstName,
                        lastName,
                        password
                    });
                    localStorage.setItem("token", response.data.token);
                    navigate("/dashboard")
                }} content= "Sign Up"/>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"../signin"}/>    
            </div>
       </div>
        
    </div>
}