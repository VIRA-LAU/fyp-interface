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
import Box from '@mui/material/Box';
import './Video.css';
import axios from "axios";
import VideoItem from "../Videos/VideoItem";
import PlayerAssignment from "../PlayerAssignment/PlayerAssignment";

SwiperCore.use([EffectCoverflow, Pagination, Autoplay, Navigation]);

function Video() {
    const theme = useTheme()
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

    const videoUrl = "https://stats-service-fyp-vira.herokuapp.com/api/v1/object-detections/{videoId}/{detectionTrackingId}/{playerId}";

    useEffect(async () => {
        const players_response = await axios.get("https://stats-service-fyp-vira.herokuapp.com/api/v1/players");
        setProfiles(players_response);
        console.log(players_response.data.playerId);
        const vid_response = await axios.get("https://stats-service-fyp-vira.herokuapp.com/api/v1/Get-Videos-Info");
        setVideos(vid_response);
        console.log(vid_response);
    }, [])


    async function handleOnClick(e){
        console.log("");
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
        console.log("rendered again")
        console.log("video file path" + videoFilePath)
        if (videos) {
            return (
                <Box sx={{display: 'flex', width: '100%', bgcolor: 'background.paper', flex: 1}}>
                    <nav aria-label="main mailbox folders" style={{flexDirection: 'row'}}>
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
                                               }}
                                    />
                                );
                            })}
                        </List>
                    </nav>
                </Box>
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
                                                color: 'white'
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
                                                color: 'white'
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
                                                color: 'white'
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
        </div>
    )
}

export default Video;