import { Switch, Route } from "react-router-dom";
import Login from "../components/public/Login/Login";
import About from "../components/public/About/About";
import Register from "../components/public/Register/Register";
import Users from "../components/Admin/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Role from '../components/Admin/Role/Role'
import Parkings from "../components/Admin/ManageParkings/Parkings";
import HomePage from "../components/public/HomePage/HomePage";
import UserParking from "../components/User/UserParking/UserParking";
import RegParking from '../components/User/RegPaking/RegPaking'
import ConfirmDK from "../components/Admin/ConfirmDK/ConfirmDK";

const AppRoutes = (props) =>{
    return(
    <>
        <Switch>

            {/* admin route */}
            <PrivateRoutes path="/admin/users" component= {Users} />
            <PrivateRoutes path="/admin/parkings" component= {Parkings} />
            <PrivateRoutes path="/admin/roles" component= {Role} />
            <PrivateRoutes path="/admin/confirmparking" component= {ConfirmDK} />
            {/* user route */}
            <PrivateRoutes path="/parking" component= {UserParking} />
            <PrivateRoutes path="/dkbaixe" component= {RegParking} />
            {/* <PrivateRoutes path="/abc" component= {Role} />          */}

            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/" exact>
                <HomePage />
            </Route>
            <Route path="/about" exact>
                <About />
            </Route>
            <Route path="*">
                <HomePage />
            </Route>
        </Switch>
    </>
    )
}

export default AppRoutes;
