import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {SnackbarProvider} from "notistack";
import {ModelButtons} from "./components/Classify/ButtonsContext";


function Greeting(){
    return (

            <BrowserRouter>
                <SnackbarProvider maxSnack={3}>
                    <ModelButtons>
                        <App/>
                    </ModelButtons>
                </SnackbarProvider>

            </BrowserRouter>

    );
}

ReactDom.render(<Greeting/>, document.getElementById('root'));
