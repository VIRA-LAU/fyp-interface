import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import SwiperCore, {EffectCoverflow, Navigation, Pagination, Autoplay} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import {IMAGES} from "../../utils/constants/images";
import {
    Grid,
    List,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import Slide from "../Slide";
import axios from "axios";
import VideoItem from "../Videos/VideoItem";
import PlayerAssignment from "../PlayerAssignment/PlayerAssignment";
import CustomPieChart from "../charts/pieChart";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import './Video.css';

SwiperCore.use([EffectCoverflow, Pagination, Autoplay, Navigation]);

function Video() {
    const theme = useTheme()
    const statsUrl = "https://stats-service-fyp-vira.herokuapp.com/api/v1/action-stats/getBy/";
    const generateUrl = "https://stats-service-fyp-vira.herokuapp.com/api/v1/action-stats/generate/";
    const [profiles, setProfiles] = useState("");
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));
    const [videos, setVideos] = useState();
    const [videoFilePath, setVideoFilePath] = useState("");
    const [detectionUrl, setDetectionUrl] = useState("");
    const [recognitionUrl, setRecognitionUrl] = useState("");
    const [personId, setPersonId] = useState(null);
    const [videoId, setVideoId] = useState(null);
    const [playerId, setPlayerId] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [isLoading, setLoading] = useState(true);

    //User Stats to be Displayed in PieChart
    const [ballInHandPercentage,setBallInHandPercentage]=useState();
    const [dribblePercentage,setDribblePercentage] = useState();
    const [noActionPercentage,setNoActionPercentage] = useState();
    const [shootingPercentage,setShootingPercentage] =useState();
    const [numberOfShots, setNumberOfShots] = useState();
    const [numberOfShotsMade, setNumberOfShotsMade] = useState();
    const [statsExist, setStatsExist] = useState(false);

    const videoUrl = "https://stats-service-fyp-vira.herokuapp.com/api/v1/object-detections/{videoId}/{detectionTrackingId}/{playerId}";

    useEffect(async () => {
        const players_response = await axios.get("https://stats-service-fyp-vira.herokuapp.com/api/v1/players");
        setProfiles(players_response);
        console.log(players_response.data.playerId);
        const vid_response = await axios.get("https://stats-service-fyp-vira.herokuapp.com/api/v1/Get-Videos-Info");
        setVideos(vid_response);
        console.log(vid_response);
        setLoading(false);
    }, [videoId])


    async function handleOnClick(e){
        console.log("");
    }

    const getStats = async (videoId) => {
        var statsPerVideo = await axios.get(statsUrl + videoId).catch(function (e){
            setStatsExist(false);
        });
        if(statsPerVideo.status == 200){
            setStatsExist(true);
            setShootingPercentage(statsPerVideo.data.shootingPercentage.substring(0, statsPerVideo.data.shootingPercentage.length-1));
            setDribblePercentage(statsPerVideo.data.dribblePercentage.substring(0, statsPerVideo.data.dribblePercentage.length-1));
            setNoActionPercentage(statsPerVideo.data.noActionPercentage.substring(0, statsPerVideo.data.noActionPercentage.length-1));
            setBallInHandPercentage(statsPerVideo.data.ballInHandPercentage.substring(0, statsPerVideo.data.ballInHandPercentage.length-1));
            setNumberOfShots(statsPerVideo.data.numberOfShots);
            setNumberOfShotsMade(statsPerVideo.data.numberOfShotsMade);
        }

        console.log("Updating stats!!!");
    }

    async function generateStats(){
        await axios.get(generateUrl + videoId);
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


    function getPercentageChart(videoId, statsExists){
        if (!isLoading) {
            if (videoId) {
                if(statsExists) {
                    return (
                        <div style={{height: "400px"}}>
                            <CustomPieChart data={dynamicData1}/>
                        </div>
                    )
                } else {
                    return (
                        <h1 style={{display: "flex", justifyContent: "center", color: "black"}}>
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

    function getButton() {
        if(detectionUrl && recognitionUrl) {
            return <button  className="generateBtn" onClick={generateStats}> Generate Stats</button>;
        }
        else{
            return <button className="generateBtn" disabled>Not Enough Data</button>;
        }
    }

    function getShotMadePercentage(videoId, statsExists) {
        if (!isLoading) {
            if (videoId) {
                if(statsExists) {
                    return (
                        <div style={{height: "400px"}}>
                            <CustomPieChart data={dynamicData2}/>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            {getButton()}
                        </div>
                    )
                }

            } else if (videoId) {
                <div> Video Has No Stats</div>
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



    const renderSwiper = () => {
        console.log(profiles)
        if (profiles) {
            return <>
                {profiles.data.map(({firstName, lastName, imageUrl, playerId}, i) => {
                    return (
                        <SwiperSlide key={i} >
                            <Slide src={imageUrl} name={firstName + " " + lastName} id={playerId} setPlayerId={setPlayerId} setPlayerName={setPlayerName}/>
                        </SwiperSlide>
                    );
                })}
            </>;

        } else {
            return <>
                {IMAGES.map(({src, name, id}, i) => {
                    return (
                        <SwiperSlide key={i}>
                            <Slide src={src} name={name} id={id}/>
                        </SwiperSlide>
                    );
                })}
            </>;
        }
    }

    const renderVideos = () => {
        if (videos) {
            return (
                    <nav aria-label="main mailbox folders" style={{flexDirection: 'row', borderRadius: "20px"}}>
                        <List style={{overflow: 'auto', display: 'flex', flexDirection: 'row'}}>
                            {videos.data.map((video) => {
                                return (

                                    <VideoItem key={video.videoId} videoId={video.videoId} videoName={video.videoName}
                                               videoRawUrl={video.videoRawUrl}
                                               videoDetectUrl={video.videoDetectUrl}
                                               videoClassifyUrl={video.videoClassifyUrl}
                                               displayVideo={() => {
                                                   setVideoFilePath(video.videoRawUrl)
                                                   setDetectionUrl(video.videoDetectUrl)
                                                   setRecognitionUrl(video.videoClassifyUrl)
                                                   setPersonId(() => {return video.personId===null? "No tracking" : video.personId})
                                                   setVideoId(video.videoId)
                                                   getStats(video.videoId);
                                               }}
                                    />
                                );
                            })}
                        </List>
                    </nav>
            );
        } else {
            return <>
            </>;
        }
    }

    return (
        <div className={"video-page-container"}>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                height={300}
                loop={true}
                centeredSlides={true}
                slidesPerView={isSmall ? "1" : "3"}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={true}
                className="mySwiper"
            >
                {renderSwiper()}
            </Swiper>
            <div
                style={{
                    padding: '10% 0'
                }}
            >
                <div style={{
                    display: 'flex'
                }}>

                    {renderVideos()}


                </div>
                <Grid container marginTop={2} spacing={3}>
                    {
                        videoFilePath &&
                        <>
                            <Grid item xs={4}>
                                <Typography textAlign={"center"}
                                            sx={{
                                                color: 'black'
                                            }}
                                            variant={"h5"}>
                                    Raw Video
                                </Typography>
                                <ReactPlayer playing={true} muted={true} width={"100%"} className="player" controls
                                             url={videoFilePath}/>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography textAlign={"center"}
                                            sx={{
                                                color: 'black'
                                            }}
                                            variant={"h5"}>
                                    Detection Video
                                </Typography>
                                <ReactPlayer playing={true} muted={true} width={"100%"} className="player" controls
                                             url={detectionUrl}/>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography textAlign={"center"}
                                            sx={{
                                                color: 'black'
                                            }}
                                            variant={"h5"}>
                                    Classification Video
                                </Typography>
                                <ReactPlayer playing={true} muted={true} width={"100%"} className="player" controls
                                             url={recognitionUrl}/>
                            </Grid>
                        </>
                    }
                </Grid>
            </div>
            <PlayerAssignment videoFilePath={videoFilePath} profiles={profiles} personId ={personId} videoId={videoId} playerId={playerId} playerName={playerName}/>

            {getShotMadePercentage(videoId, statsExist)}
            {getPercentageChart(videoId, statsExist)}
        </div>
    )
}

export default Video;