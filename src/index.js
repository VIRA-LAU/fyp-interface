import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {SnackbarProvider} from "notistack";


function Greeting(){
    return (

            <BrowserRouter>
                <SnackbarProvider maxSnack={3}>
            <App/>
                </SnackbarProvider>

            </BrowserRouter>

    );
}

ReactDom.render(<Greeting/>, document.getElementById('root'));
