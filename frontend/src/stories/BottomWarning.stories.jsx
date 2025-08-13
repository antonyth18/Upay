import BottomWarning from "../components/BottomWarning"

export default {
    title: "BottomWarning",
    component: BottomWarning
}

export const bw = () => <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"../pages/Signin"}/>