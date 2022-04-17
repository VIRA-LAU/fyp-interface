import React from "react";
import Video from "./components/Video/Video";
import { useNavigate } from "react-router-dom";

const Home = ({handleLogout}) => {
    let navigate = useNavigate();
    return (
        <section className="home">
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={ () => navigate("../stats", { replace: true })}>Stats</button>
                <button onClick={ () => navigate("../players", { replace: true })}>Players</button>
                <button onClick={ () => navigate("../systems", { replace: true })}>Systems</button>
                <button>Classify</button>
            </nav>
            <Video />
        </section>
    );
};

export default Home;
