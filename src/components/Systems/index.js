import React from 'react';
import {Component, useEffect, useState} from "react";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {useNavigate} from "react-router-dom";


const Systems = () => {
    const [systems, setSystems] = useState(() => []);
    const [rows, setRows] = useState(() => []); 

    const url = 'https://stats-service-fyp-vira.herokuapp.com/api/v1/sources';

    function getSystems(){
        axios.get(`${url}`)
        .then((response) => {
            setSystems(response.data);
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    useEffect(()=>{
        getSystems();
        setRows(systems.map((system) => ({id: system.roverName, roverName: system.roverName, cameraName: system.cameraName, imageQuality: system.imageQuality, videoCollection: system.videoCollection})));
    },[systems])
    
    const columns = [
        { field: 'roverName', headerName: 'Rover Name', width: 130 },
        { field: 'cameraName', headerName: 'Camera Name', width: 130 },
        { field: 'imageQuality', headerName: 'Image Quality', width: 130 },
        { field: 'videoCollection', headerName: 'Video Collection', width: 130 },
    ];

    let navigate = useNavigate();
    return(
        <section className="home">
            <nav>
                <h2>Welcome</h2>
                <button onClick={ () => navigate("../", { replace: true })}>Home</button>
                <button onClick={ () => navigate("../stats", { replace: true })}>Stats</button>
                <button onClick={ () => navigate("../players", { replace: true })}>Players</button>
                <button onClick={ () => navigate("../systems", { replace: true })}>Systems</button>
                <button>Classify</button>
            </nav>

            <div style={{ height: 400, width: '100%', marginTop: 16}}>
            <DataGrid style={{color: 'white'}}
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