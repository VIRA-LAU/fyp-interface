import {Autocomplete, Grid, TextField, Typography} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Button from "@mui/material/Button";
import React from "react";



function PlayerAssignment(props) {
    return (<Grid item xs={12}>
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
                                            value={props.videoFilePath.personId}
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

                                        <Autocomplete
                                            onInputChange={(event, newInputValue) => {
                                                console.log(newInputValue, event)
                                            }}
                                            options={props.profiles}
                                            fullWidth
                                            getOptionLabel={(e) => e.firstName + " " + e.lastName}
                                            filterSelectedOptions
                                            renderInput={(params) => (

                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    style={{
                                                        borderBottom: 'none',
                                                        maxWidth: '100%',
                                                        alignSelf: 'center',
                                                        flexGrow: 1,
                                                        background: 'rgb(233,233,233)',
                                                        borderRadius: '0px 20px 20px 0px'
                                                    }}
                                                />
                                            )}
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
                                // disabled={ isLoading}
                                // // disabled={ !value>0 || fetchTransferPending || to==="" }
                                // onClick={() => handleAssign()}
                            >
                                Assign
                            </Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    </Grid>);
}

export default PlayerAssignment;