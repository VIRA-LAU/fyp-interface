import React from 'react';
import Video from "../../Video";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {FixedSizeList} from 'react-window';
import CircularProgress from '@mui/material/CircularProgress';

import {Container, Grid, List} from "@mui/material";
import {useEffect, useState} from 'react';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {InputAdornment} from '@mui/material';
import {IconButton} from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import {color, style} from '@mui/system';
import CustomPieChart from "../../charts/pieChart";

const Stats = () => {

    const [myOptions, setMyOptions] = useState([])
    const [value, setValue] = useState([])
    const [stat, setStat] = useState()
    const [statsExists, setStatExist] = useState()
    const [loading, setLoading] = useState()
    var list=[]


    //User Profile to be Displayed by Zena
    const [email, setEmail] = useState()
    const [firstName, setFirstName] = useState()
    const [imageUrl, setImageUrl] = useState()
    const [lastName, setLastName] = useState()
    const [responseList, setRepsonseList] = useState();
    const [playerId, setPlayerId] = useState();

    //User Stats to be Displayed in PieChart
    const [ballInHandPercentage,setBallInHandPercentage]=useState()
    const [dribblePercentage,setDribblePercentage] = useState()
    const [noActionPercentage,setNoActionPercentage] = useState()
    const [shootingPercentage,setShootingPercentage] =useState()

    const [fieldGoalPrecentage,setFieldGoalPrecentage] =useState()
    const [numberOfShots,setNumberOfShots] =useState()
    const [numberOfShotsMade,setNumberOfShotsMade] =useState()



    //API Links to be used
    var baseApi = "https://stats-service-fyp-vira.herokuapp.com/api/v1/"
    var api = baseApi + "players/search/";
    var statsUrl = baseApi + "action-stats/by/"


    useEffect(async () => {

        // you set the new parameters zena
        // setFirstName () , lastNAme
        // call for endpoints to get statsics

        setLoading(true)
        //console.log(loading)
        var statPerPlayerForAllVideo = await axios.get(statsUrl + playerId).catch(function (e){
            //console.log("No Stats Found")
            setLoading(false)
            setStatExist(false)
        })
        //console.log(statPerPlayerForAllVideo.status)
            if(statPerPlayerForAllVideo.status == 200){
                //console.log("There is data")
                setLoading(false)
                setStatExist(true)
            }



        //console.log(statPerPlayerForAllVideo)
        // if status code 404 return on the screen player Has no stats
        // useSTate (Response responseStatus)

        // setResponse = response.status
    }, [playerId,email])




    const getStats = async (playerId) => {
        var statsPerVideo = await axios.get(statsUrl + playerId)
        setShootingPercentage(statsPerVideo.data.shootingPercentage)
        setDribblePercentage(statsPerVideo.data.dribblePercentage)
        setNoActionPercentage(statsPerVideo.data.noActionPercentage)
        setBallInHandPercentage(statsPerVideo.data.ballInHandPercentage)

        setFieldGoalPrecentage(statsPerVideo.data.fieldGoalPrecentage)
        setNumberOfShots(statsPerVideo.data.numberOfShots)
        setNumberOfShotsMade(statsPerVideo.data.numberOfShotsMade)

        //console.log(statsPerVideo)
    }

    const dynamicData2 = [
        {
            "id": "numberOfShots",
            "label": "numberOfShots",
            "value": numberOfShots,
            "color": "hsl(172, 70%, 50%)"
        },
        {
            "id": "numberOfShotsMade",
            "label": "numberOfShotsMade",
            "value": numberOfShotsMade,
            "color": "hsl(181, 12%, 50%)"
        },

    ]


    const dynamicData1 = [
        {
            "id": "shootingPercentange",
            "label": "shootingPercentange",
            "value": shootingPercentage,
            "color": "hsl(177, 70%, 50%)"
        },
        {
            "id": "dribblePercentage",
            "label": "dribblePercentage",
            "value": dribblePercentage,
            "color": "hsl(172, 70%, 50%)"
        },
        {
            "id": "NoActionPercentage",
            "label": "NoActionPercentage",
            "value": noActionPercentage,
            "color": "hsl(181, 12%, 50%)"
        },
        {
            "id": "ballInHandPercentage",
            "label": "ballInHandPercentage  ",
            "value": ballInHandPercentage,
            "color": "hsl(172, 32%, 50%)"
        }
    ]




    // Defining function to get unique values from an array
    function getUnique(array){
        var uniqueArray = [];
        
        // Loop through array values
        for(var value of array){
            if(uniqueArray.indexOf(value) === -1){
                uniqueArray.push(value);
            }
        }
        return uniqueArray;
    }
    
    // Whenever the user types an input this function will get a response which includes the profile.
    const getProfileFromAPI = async (data) => {

        var textFieldOutput = data.target.value
        var searchdata = api + textFieldOutput
        var response = await axios.get(searchdata);
        setRepsonseList(response)
        console.log(responseList)
        
        responseList.data.map(a => list.push(a.firstName))
        setMyOptions(getUnique(list))

    }

    // This function will select which player is being queried by the user
    // HERE WE NEED TO ADJUST BECAUSE WHEN WE HAVE SEVERAL PLAYERS HAVING SAME NAME WE WILL ALWAYS SELECT THE FIRST OCCURENCE!!!!==>SOLVED : FUTUTRE WORK
    const selectPlayer = (data) => {
        responseList.data.forEach(player => {
            if (player.firstName === data) {
                setPlayerId(player.playerId)
                getStats(player.playerId)
                setEmail(player.email)
                setFirstName(player.firstName)
                setLastName(player.lastName)
                setImageUrl(player.imageUrl)
            }
        })
        //console.log(responseList)

        // set the data that will be used by zena in the interface

    }


    

    const getPercentageChart =() => {
        if (!loading) {
            if (playerId) {
                if(statsExists) {
                    return (
                        <div style={{height: "400px"}}>
                            <CustomPieChart data={dynamicData1}/>
                        </div>
                    )
                } else {
                    return (
                        <h1 style={{display: "flex", justifyContent: "center", color: "white"}}>
                            No Stats Found
                        </h1>
                    )
                }

            } else if (playerId) {
                <div> Player Has No Stats</div>
            } else {
                <div></div>
            }
        } else {
            return (
                <div style = {{display: "flex", justifyContent: "center"}}>
                    <CircularProgress disableShrink />;
                </div>
            )
        }
    }

    const getShotMadePercentage = () => {
        if (!loading) {
            if (playerId) {
                if(statsExists) {
                    return (
                        <div style={{height: "400px"}}>
                            <CustomPieChart data={dynamicData2}/>
                        </div>
                    )
                } else {
                    return (
                        <h1 style={{display: "flex", justifyContent: "center", color: "white"}}>
                            No Stats Found
                        </h1>
                    )
                }

            } else if (playerId) {
                <div> Player Has No Stats</div>
            } else {
                <div></div>
            }
        } else {
            return (
                <div style = {{display: "flex", justifyContent: "center"}}>
                    <CircularProgress disableShrink />;
                </div>
            )
        }
    }

    const getProfile = () =>{
        if (!loading) {
            if (playerId) {
                    return (

                            <div className="form-container registration-container">
                                <div className="overlay">
                                    <div >
                                        <img src={imageUrl} className="playerImg"></img>
                                    </div>
                                    <div className="dataContainer">
                                        <div><b>First Name:</b> {firstName}</div>
                                        <div><b>Last Name:</b> {lastName}</div>
                                        <div><b>Email:</b> {email}</div>
                                    </div>
                                </div>
                            </div>

                    )
            } else if (!playerId) {
                <div> Player Has No Profile</div>
            } else {
                <div></div>
            }
        } else {
            return (
                <div style = {{display: "flex", justifyContent: "center"}}>
                    <CircularProgress disableShrink />;
                </div>
            )
        }

    }

    return (
        <section className="home">
            <nav>
                <h2>Welcome</h2>
                <button>Stats</button>
                <button>Classify</button>
            </nav>

            <div style={{color: "white", display: "flex", justifyContent: "center", paddingTop: "15px"}}>
                Search For the player
            </div>

            <Grid container spacing={3}>

                <Grid item xs>

                </Grid>


                <Grid item xs>
                    <Autocomplete
                        inputProps={{
                            style: {
                                width: '150px', height: '20px',
                                background: 'white',
                                border: '2px outset lightgray',
                                color: "white",
                                paddingTop:"150px",
                            },
                            placeholder: 'Search language'
                        }}
                        onChange={(event, value) => {
                            selectPlayer(value)
                        }}
                        freeSolo
                        autoComplete
                        autoHighlight
                        forcePopupIcon={true}
                        popupIcon={<SearchIcon/>}
                        options={myOptions}
                        renderInput={(params) => (
                            <TextField {...params}
                                       icon={SearchIcon}
                                       value={setValue(value)}
                                       onChange={(e) => {
                                           getProfileFromAPI(e)
                                       }}
                                       size="small"
                                       variant="filled"
                                       label="Player Name"

                            />
                        )}/>
                </Grid>



                <Grid item xs>

                </Grid>










            </Grid>

            <Grid container spacing={3}>

                <Grid item xs>
                </Grid>


                <Grid item xs>

                    <div className="player-container" id="player-container" style={{justifyContent: "center", paddingLeft:"150px"}}>
                    {getProfile()}
                    </div>
                </Grid>

                <Grid item xs>
                </Grid>

                <Grid container spacing={3}>
                    <div style={{height: "400px"}}>
                        <CustomPieChart data={dynamicData1}/>
                    </div>
                    <Grid item xs>
                        {getPercentageChart()}
                    </Grid>

                    <Grid item xs>
                        <div style={{height: "400px"}}>
                            {getShotMadePercentage()}
                        </div>
                </Grid>
                </Grid>
            </Grid>


        </section>
    );
};

export default Stats;
