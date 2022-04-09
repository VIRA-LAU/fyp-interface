import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";


function Greeting(){
    return (

            <BrowserRouter>

            <App/>

            </BrowserRouter>

    );
}

ReactDom.render(<Greeting/>, document.getElementById('root'));
