import React from 'react';
import Video from "../Video/Video";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import {Container, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";


function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={`Item ${index + 1}`} />
            </ListItemButton>
        </ListItem>
    );
}


const Stats = () => {
    let navigate = useNavigate();
    return (
        <section className="home">
            <nav>
                <h2>Welcome</h2>
                <button onClick={ () => navigate("../", { replace: true })}>Home</button>
                <button onClick={ () => navigate("../stats", { replace: true })}>Stats</button>
                <button onClick={ () => navigate("../players", { replace: true })}>Players</button>
                <button>Classify</button>
            </nav>

        <Container>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4}>
                    <div
                        style={{
                            padding:'10% 0',
                            color: 'white'
                        }}

                    >
                        <Box
                            sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'transparent' }}
                        >
                            <h1 style={{display: 'flex', justifyContent: 'center', paddingBottom: '15px'}}>  Raw Video</h1>
                            <FixedSizeList
                                height={400}
                                width={360}
                                itemSize={46}
                                itemCount={15}
                                overscanCount={5}
                            >
                                {renderRow}
                            </FixedSizeList>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div
                        style={{
                            padding:'10% 0',
                            color: 'white'
                        }}

                    >
                        <Box
                            sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'transparent' }}
                        >
                            <h1 style={{display: 'flex', justifyContent: 'center', paddingBottom: '15px'}}>  Detection And Tracking Videos</h1>
                            <FixedSizeList
                                height={400}
                                width={360}
                                itemSize={46}
                                itemCount={15}
                                overscanCount={5}
                            >
                                {renderRow}
                            </FixedSizeList>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div
                        style={{
                            padding:'10% 0',
                            color: 'white'
                        }}

                    >
                        <Box
                            sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'transparent' }}
                        >
                            <h1 style={{display: 'flex', justifyContent: 'center',paddingBottom: '15px'}}> Action Classification Videos  </h1>
                            <FixedSizeList
                                height={400}
                                width={360}
                                itemSize={46}
                                itemCount={15}
                                overscanCount={5}
                            >
                                {renderRow}
                            </FixedSizeList>
                        </Box>
                    </div>
                </Grid>
            </Grid>


        </Container>



        </section>
    );
};

export default Stats;
