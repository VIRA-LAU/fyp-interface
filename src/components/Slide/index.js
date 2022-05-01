import React, {useState} from 'react';
import {Typography} from "@mui/material";
import axios from "axios";

const Slide = ({src,name,id, setPlayerName, setPlayerId}) => {

    async function handleOnClick(){
        setPlayerName(name);
        setPlayerId(id);
    }
    return (
        <div onClick={handleOnClick} style={{
            width:"100%",
            height:'600px',
            background: `no-repeat center/80% url(${src}), rgba(96, 59, 187, 1)`,
            display:'flex',
            flexDirection:"column",
            placeContent:'end',
            padding:'10%',
            borderRadius: "20px"
        }}>
            <div  style={{

                padding:'10px',
                marginBottom:'10px'
            }}>
                <Typography textAlign={"center"} sx={{color:'white'}} variant={"h5"}>
                    {name}
                </Typography>
            </div>
        </div>
    );
};

export default Slide;