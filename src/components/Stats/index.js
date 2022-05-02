import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './stats.css';
import { Grid } from "@mui/material";
import {useEffect, useState} from 'react';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CustomPieChart from "../charts/pieChart/index";
import Navbar from "../Navbar/Navbar";

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



    const getFieldGoalPercentage = () => {
        if(statsExists) {
            return (
                <div><b>Shooting Accuracy:</b> {fieldGoalPrecentage + "%"}</div>
            )
        }
    }
    const getStats = async (playerId) => {
        var statsPerVideo = await axios.get(statsUrl + playerId)
        setShootingPercentage(Math.round(statsPerVideo.data.shootingPercentage * 1000) / 1000)
        setDribblePercentage(Math.round(statsPerVideo.data.dribblePercentage * 1000) / 1000)
        setNoActionPercentage(Math.round(statsPerVideo.data.noActionPercentage * 1000) / 1000)
        setBallInHandPercentage(Math.round(statsPerVideo.data.ballInHandPercentage * 1000) / 1000)
        setFieldGoalPrecentage(Math.round(statsPerVideo.data.fieldGoalPrecentage * 1000) / 1000)
        setNumberOfShots(Math.round(statsPerVideo.data.numberOfShots * 1000) / 1000)
        setNumberOfShotsMade(Math.round(statsPerVideo.data.numberOfShotsMade * 1000) / 1000)

        console.log(statsPerVideo)
    }

    const dynamicData2 = [
        {
            "id": "numberOfShotsMissed",
            "label": "numberOfShotsMissed",
            "value": numberOfShots-numberOfShotsMade,
            "color": "hsl(181, 12%, 50%)"
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
                        <h1 style={{display: "flex", justifyContent: "center", color: "black"}}>
                            No Stats Found
                        </h1>
                    )
                }

            }
            else {
                <div></div>
            }
        } else {
            return (
                <div style = {{display: "flex", justifyContent: "center"}}>
                    <CircularProgress disableShrink />
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
                        <h1 style={{display: "flex", justifyContent: "center", color: "black"}}>
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
                    <CircularProgress disableShrink />
                </div>
            )
        }
    }

    const getProfile = () =>{
        if (!loading) {
            if (playerId) {
                return (

                        <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>

                                <img src={imageUrl} className="playerImg"></img>

                            <div className="dataContainer" style={{marginBottom: "25%"}}>
                                <div><b>First Name:</b> {firstName}</div>
                                <div><b>Last Name:</b> {lastName}</div>
                                <div><b>Email:</b> {email}</div>
                                {getFieldGoalPercentage()}
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
                    <CircularProgress disableShrink />
                </div>
            )
        }

    }

    return (
        <section className="home">
            <Navbar />

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
                        // popupIcon={<SearchIcon />}
                        options={myOptions}
                        renderInput={(params) => (
                            <TextField style={{marginBottom: "10px"}} {...params}
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
                    <div className="profile-container">
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
