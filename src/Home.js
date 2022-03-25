import React from "react";
import Video from "./Video";

const Home = ({handleLogout}) => {
    return (
        <section className="home">
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <Video />
        </section>
    );
};

export default Home;