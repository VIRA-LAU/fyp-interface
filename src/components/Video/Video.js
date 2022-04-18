import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import SwiperCore, {EffectCoverflow, Navigation, Pagination, Autoplay} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import {IMAGES} from "../../utils/constants/images";
import {
    Autocomplete,
    Grid,
    List,
    Stack,
    TextField,
    ThemeProvider,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import Slide from "../Slide";
import Box from '@mui/material/Box';
import './Video.css';
import axios from "axios";
import VideoItem from "../Videos/VideoItem";
import PlayerAssignment from "../PlayerAssignment";

SwiperCore.use([EffectCoverflow, Pagination, Autoplay, Navigation]);


function Video() {
    const theme = useTheme()
    const [profiles, setProfiles] = useState("");
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [videos, setVideos] = useState();
    const [videoFilePath, setVideoFilePath] = useState("");
    const [detectionUrl, setDetectionUrl] = useState("");
    const [recognitionUrl, setRecognitionUrl] = useState("");


    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };

    // const handleVideoUpload = (event) => {
    //     setVideoFilePath(URL.createObjectURL(event.target.files[0]));
    // };

    useEffect(async () => {
        const players_response = await axios.get("https://stats-service-fyp-vira.herokuapp.com/api/v1/players");
        setProfiles(players_response);
        const vid_response = await axios.get("https://stats-service-fyp-vira.herokuapp.com/api/v1/Get-Videos-Info");
        setVideos(vid_response);
        // if (selected[0] !== 0) {
        //
        // } else {
        //     setVideoFilePath(null)
        // }
    }, [])
    // console.log(selectedPlayer)

    const renderSwiper = () => {
        //  console.log(profiles)
        if (profiles) {
            return <>
                {profiles.data.map(({firstName, lastName, imageUrl, playerId}, i) => {
                    //      console.log(imageUrl)
                    return (

                        <SwiperSlide key={i}>
                            <Slide src={imageUrl} name={firstName + " " + lastName} id={playerId}/>
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
                <Box sx={{display: 'flex', width: '100%', minWidth: 250, bgcolor: 'background.paper'}}>
                    <nav aria-label="main mailbox folders">
                        <List>
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
                                                   console.log("video clicked is " + video.videoName)
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
            {/*<input className="player" type="file" onChange={handleVideoUpload} />*/}
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                // autoplay={{
                //     delay: 1000,
                // }}
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
                // navigation={true}
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
                    {/* Video Displays*/}
                    <Grid container marginTop={2} spacing={3}>
                        <div style={{
                            display: 'flex'
                        }}>
                            {renderVideos()}
                        </div>
                        {
                            videoFilePath &&
                            <>
                                <Grid item xs={4}>
                                    <Stack spacing={2} direction="row">
                                    <Typography textAlign={"center"}
                                                sx={{
                                                    color: 'white'
                                                }}
                                                variant={"h5"}>
                                        Raw Video
                                    </Typography>
                                    <ReactPlayer  playing={true} muted={true} width={"100%"} className="player" controls
                                                 url={videoFilePath}/>
                                    <Typography textAlign={"center"}
                                                sx={{
                                                    color: 'white'
                                                }}
                                                variant={"h5"}>
                                        Detection Video
                                    </Typography>
                                    <ReactPlayer  playing={true} muted={true} width={"100%"} className="player" controls
                                                 url={detectionUrl}/>
                                    <Typography textAlign={"center"}
                                                sx={{
                                                    color: 'white'
                                                }}
                                                variant={"h5"}>
                                        Classification Video
                                    </Typography>
                                    <ReactPlayer  playing={true} muted={true} width={"100%"} className="player" controls
                                                 url={recognitionUrl}/>
                                        </Stack>

                                </Grid>
                            </>
                        }
                    </Grid>
                </div>
                <PlayerAssignment videoFilePath = {videoFilePath} profiles = {profiles}/>
            </div>
        </div>
    )
}

export default Video;