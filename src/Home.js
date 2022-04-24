import React from "react";
import Video from "./components/Video/Video";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const Home = () => {
    let navigate = useNavigate();
    return (
        <section className="home">
           <Navbar/>
            <Video/>
        </section>
    );
};

export default Home;
