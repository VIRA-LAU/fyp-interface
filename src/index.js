import React from "react";
import ReactDom from "react-dom";
import App from "./App";


function Greeting(){
    return (
        <div>
            <App/>
        </div>
    );
}

ReactDom.render(<Greeting/>, document.getElementById('root'));