import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Subheading from "../components/Subheading";

export function Signin() {
    return <div className="bg-slate-300 h-screen flex justify-center">  
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-96 px-6">
                <Heading heading= {"Sign In"}/>
                <Subheading subheading = {"Enter your credentials to access your account"}/>
                <div className="p-2"></div>
                <InputBox label= {"Email"} placeholder= {"johndoe@org.com"}/>
                <InputBox label= {"Password"} placeholder= {"jdisgoat"}/>
                <div className="p-2"></div>
                <Button content= "Sign Ip"/>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"../signup"}/>    
            </div>
       </div>
        
    </div>
}