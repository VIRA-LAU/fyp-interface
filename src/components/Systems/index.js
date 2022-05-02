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
        { field: 'roverName', headerName: 'Rover Name', width: 310 },
        { field: 'cameraName', headerName: 'Camera Name', width: 310 },
        { field: 'imageQuality', headerName: 'Image Quality', width: 310 },
        { field: 'numberOfVideos', headerName: 'Number of Videos', width: 310 },
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
      
            <DataGrid style={{color: 'black', backgroundColor: "rgba(176,175,175,0.8)"}}
            
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
