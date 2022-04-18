import {Autocomplete, Grid, TextField, Typography} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import axios from "axios";


function PlayerAssignment(props) {
    const [newPerson, setNewPerson] = useState("");
    let vidUrl = "https://stats-service-fyp-vira.herokuapp.com/api/v1/object-detections/";
    async function assign() {
        console.log("Assign Pressed!!!!!");
        console.log("PersonId " + newPerson);
        console.log(props.personId);
        console.log(props.videoId);
        console.log("Player ID: " + props.playerName);
        vidUrl = vidUrl + props.videoId +"/"+props.personId +"/"+props.playerId;
        const update = await axios.put(vidUrl, article);
        console.log(update);

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
                            alignItems: 'center',

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
                            <Button
                                variant="contained"
                                style={{
                                    minWidth: '45%',
                                    maxWidth: '45%',
                                    alignSelf: 'center',
                                    marginTop: '25px',
                                    height: '60px',
                                    borderRadius: '30px',
                                    fontSize: '1em',
                                    background: "rgba(38, 20, 72, 0.9)"
                                }}
                                onClick={assign}
                            >
                                Assign
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>);
}

export default PlayerAssignment;