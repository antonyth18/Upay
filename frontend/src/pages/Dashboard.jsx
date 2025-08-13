import AppBar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";

export function Dashboard() {
    return <div>
        <AppBar />
        <div className="p-2"></div>
        <Balance />
        <Users />
    </div>
}