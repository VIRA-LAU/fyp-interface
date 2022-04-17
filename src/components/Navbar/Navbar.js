import React from "react";
import {getAuth, signOut} from "firebase/auth";
import fire from "../../fire";
import {useNavigate} from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {

    const auth = getAuth(fire);

    const handleLogout = () => {
        signOut(auth);
    };

    let navigate = useNavigate();

    return (
        <nav>
            <h2>Welcome</h2>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate("../", {replace: true})}>Home</button>
            <button onClick={ () => navigate("../stats", { replace: true })}>Stats</button>
            <button onClick={ () => navigate("../players", { replace: true })}>Players</button>
            <button onClick={ () => navigate("../classify", {replace: true})}>Classify</button>
        </nav>

    );
};
export default Navbar;