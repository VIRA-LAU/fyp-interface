import React from "react";
import Video from "./Video";
import { useNavigate } from "react-router-dom";

const Home = ({handleLogout}) => {
    let navigate = useNavigate();
    return (
        <section className="home">
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={ () => navigate("../stats", { replace: true })}>Stats</button>
                <button>Classify</button>
            </nav>
            <Video />
        </section>
    );
};

export default Home;
