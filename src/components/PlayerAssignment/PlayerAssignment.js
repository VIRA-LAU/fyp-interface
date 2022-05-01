import {Grid, TextField, Typography} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {useSnackbar} from "notistack";
import './PlayerAssignment.css';

let vidUrl = "https://stats-service-fyp-vira.herokuapp.com/api/v1/object-detections/";
let noTracking = 'No tracking';


function PlayerAssignment(props) {
    const [loading, setLoading] = useState(false);
    const [assignStatus, setAssignStatus] = useState(false);
    const {enqueueSnackbar} = useSnackbar();


    const assign = (variant) => async () => {
        setLoading(true)
        vidUrl = vidUrl + props.videoId + "/" + props.personId + "/" + props.playerId;
        const update = await axios.put(vidUrl);
        setLoading(false)
        // variant could be success, error, warning, info, or default
        if (update.status === 200) {
            setAssignStatus(true)
            enqueueSnackbar('Player Has Been Assigned!', {variant});
        }
    };


    const isVideoNotTracked = () => {
        return props.personId === noTracking;
    }

    const isVideoNotSelected = () => {
        return props.videoFilePath === '';
    }

    const isPersonNotSelected = () => {
        return props.playerId === '';
    }

    const isVideoAndPlayerNotSelected = () => {
        return props.videoFilePath === '' && props.playerId === '';
    }


    const isAssigned = () => {
        if (loading)
            return <>
                <div style={{paddingTop: '20px', color: "white"}}>Assigning ....</div>
                <Box sx={{paddingTop: '20px', width: '100%'}}>
                    <LinearProgress/>

                </Box>
            </>;
    }


    function getButton() {
        console.log(props.personId)


        if (isVideoAndPlayerNotSelected()) {
            return (<div style={{paddingTop: "25px", color: "white"}}>
                    A Video And Person Needed To Be Selected First
                </div>
            )
        } else if (isVideoNotSelected()) {
            return (<div style={{paddingTop: "25px", color: "white"}}>
                    Select A Video
                </div>
            )
        } else if (isVideoNotTracked()) {
            return (<div style={{paddingTop: "25px", color: "red"}}>
                    This Video Has No Current Tracking! Select Another One
                </div>
            )
        } else if (isPersonNotSelected()) {
            return (<div style={{paddingTop: "25px", color: "white"}}>
                    Select A Person
                </div>
            )
        } else {
            return <Button
                className= "assignBtn"

                variant="contained"
                onClick={assign('success')}
            >
                Assign
            </Button>;
        }
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div style={{
                        color: 'rgba(38, 20, 72, 0.9)',
                        height: '100%'
                    }}>

                        <div style={{
                            display: 'flex',
                            border: '2px solid rgba(38, 20, 72, 1)',
                            flexDirection: 'column',
                            boxSizing: 'border-box',
                            borderRadius: '32.5px',
                            padding: '20px 8px',
                            alignItems: 'center'

                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                minWidth: '95%',
                                maxWidth: '95%',
                                placeItems: 'center'
                            }}>
                                <div style={{
                                    minWidth: '45%',
                                    maxWidth: '45%'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        placeContent: 'center', width: '100%'
                                    }}>
                                        <div style={{
                                            background: 'rgb(233,233,233)',
                                            height: '56px',
                                            minWidth: '150px',
                                            maxWidth: '150px',
                                            borderRadius: '20px 0px 0px 20px',
                                            display: 'flex',
                                            placeItems: 'center',
                                            padding: '0px 10px'
                                        }}>
                                            <Typography variant="body1" fontWeight={100}>
                                                Person Tracked
                                            </Typography>
                                        </div>
                                        <TextField
                                            variant="outlined"
                                            style={{
                                                borderBottom: 'none',
                                                maxWidth: '100%',
                                                alignSelf: 'center',
                                                flexGrow: 1,
                                                background: 'rgb(233,233,233)',
                                                borderRadius: '0px 20px 20px 0px'

                                            }}
                                            disabled
                                            // Get person ID from endpoint
                                            value={props.personId}
                                        />
                                    </div>
                                </div>
                                <ArrowRightAltIcon color="primary"
                                                   sx={{
                                                       margin: 'auto',
                                                       flexGrow: 1,
                                                   }}
                                />
                                <div style={{
                                    minWidth: '45%',
                                    maxWidth: '45%'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        placeContent: 'center', width: '100%'
                                    }}>
                                        <div style={{
                                            background: 'rgb(233,233,233)',
                                            height: '56px',
                                            minWidth: '75px',
                                            maxWidth: '75px',
                                            borderRadius: '20px 0px 0px 20px',
                                            display: 'flex',
                                            placeItems: 'center',
                                            padding: '0px 10px'
                                        }}>
                                            <Typography variant="body1" fontWeight={100}>
                                                Person
                                            </Typography>
                                        </div>
                                        <TextField
                                            disabled
                                            variant="outlined"
                                            value={props.playerName}
                                            style={{
                                                borderBottom: 'none',
                                                maxWidth: '100%',
                                                alignSelf: 'center',
                                                flexGrow: 1,
                                                background: 'rgb(233,233,233)',
                                                borderRadius: '0px 20px 20px 0px'
                                            }}

                                        />

                                    </div>
                                </div>
                            </div>
                            <React.Fragment>
                                {getButton()}
                            </React.Fragment>
                            {isAssigned()}

                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>);
}

export default PlayerAssignment;
