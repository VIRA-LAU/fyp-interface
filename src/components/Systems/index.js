import React from 'react';
import {Component, useEffect, useState, useMemo} from "react";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {useNavigate} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import {RingLoader} from "react-spinners";


const Systems = () => {
    const [systems, setSystems] = useState(() => []);
    const [rows, setRows] = useState(() => []);
    const [isLoading, setLoading] = useState(true);

    const url = 'https://stats-service-fyp-vira.herokuapp.com/api/v1/sources';

    function getSystems(){
        axios.get(`${url}`)
        .then((response) => {
            setSystems(response.data);
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    useEffect(()=>{
        setLoading(false);
        getSystems();
        setRows(systems.map((system) => ({id: system.roverName, roverName: system.roverName, cameraName: system.cameraName, imageQuality: system.imageQuality, numberOfVideos: system.numberOfVideos})));
    },[systems.length])
    
    const columns = [
        { field: 'roverName', headerName: <b>Rover Name</b>, width: 310 },
        { field: 'cameraName', headerName: <b>Camera Name</b>, width: 310 },
        { field: 'imageQuality', headerName: <b>Image Quality</b>, width: 310 },
        { field: 'numberOfVideos', headerName: <b>Number of Videos</b>, width: 310 },
    ];



    let navigate = useNavigate();

    if (isLoading) {
        return (
            <section style={{marginLeft: "45%", marginTop: "15%"}}>
                <RingLoader color="#603bbb" size={150} />
            </section>
        )
    }
    return(
        <section className="home2">
            <Navbar />

            <div style={{ height: 450, width: '100%', marginTop: 16, color: 'black'}}>
            <DataGrid style={{color: 'white', backgroundColor: "#42028A"}}  //BBADFF - Black
                                                                            //42028A - White
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
            </div>
            
        </section>
    );
};

export default Systems;
