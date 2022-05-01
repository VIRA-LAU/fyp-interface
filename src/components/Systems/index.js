import React from 'react';
import {Component, useEffect, useState, useMemo} from "react";
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {useNavigate} from "react-router-dom";
import Navbar from "../Navbar/Navbar";


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
        setRows(systems.map((system) => ({id: system.roverName, roverName: system.roverName, cameraName: system.cameraName, imageQuality: system.imageQuality, numberOfVideos: system.numberOfVideos})));
    },[systems.length])
    
    const columns = [
        { field: 'roverName', headerName: 'Rover Name', width: 310 },
        { field: 'cameraName', headerName: 'Camera Name', width: 310 },
        { field: 'imageQuality', headerName: 'Image Quality', width: 310 },
        { field: 'numberOfVideos', headerName: 'Number of Videos', width: 310 },
    ];

    let navigate = useNavigate();
    return(
        <section className="home2">
            <Navbar />

            <div style={{ height: 450, width: '100%', marginTop: 16, color: 'white'}}>
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