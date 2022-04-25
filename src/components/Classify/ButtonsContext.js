import React, {useState} from "react";


const ButtonsContext = React.createContext();

export const ModelButtons = (props) => {
    const [detectVideo, setDetectVideo] = useState(null)
    const [classifyVideo, setClassifyVideo] = useState(null)
    const [detectBtnloading, setdetectBtnloading] = useState(false);
    const [classifyBtnloading, setclassifyBtnloading] = useState(false);
    return (<ButtonsContext.Provider value={{
            detectVideo,
            setDetectVideo,
            detectBtnloading,
            setdetectBtnloading,
            classifyVideo,
            setClassifyVideo,
            classifyBtnloading,
            setclassifyBtnloading
        }}>
            {props.children}
        </ButtonsContext.Provider>
    );
}

export default ButtonsContext;