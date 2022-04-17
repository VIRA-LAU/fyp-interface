import Navbar from "../Navbar/Navbar";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Grid, List, Stack, ThemeProvider, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import VideoItem from "../Videos/VideoItem";
import ReactPlayer from "react-player";
import SendIcon from '@mui/icons-material/Send';
import {LoadingButton} from "@mui/lab";
import {createTheme} from '@material-ui/core/styles'


const Classify = () => {
    const url = "https://stats-service-fyp-vira.herokuapp.com/api/v1/Get-Unprocessed"
    const [loadedVideos, setLoadedVideos] = useState();
    const [isLoading, setLoading] = useState(true)
    const [videoFilePath, setVideoFilePath] = useState(null);
    const [loading, setBtnLoading] = useState(false);
    const [detectionUrl, setDetectionUrl] = useState(null);
    const [recognitionUrl, setRecognitionUrl] = useState(null);

    function detectionClick() {
        setBtnLoading(true);
    }

    function recognitionClick() {
        setBtnLoading(true);
    }

    useEffect(async () => {
        console.log("fetching videos again")
        setLoading(true)
        const response = await axios.get(url);
        setLoadedVideos(response);
        setLoading(false)
    }, [])

    const theme = createTheme({
        palette: {
            action: {
                disabledBackground: 'red',
                disabled: 'white'
            }
        }
    })

    const renderVideos = () => {
        console.log("rendered again")
        console.log("video file path" + videoFilePath)
        if (loadedVideos) {
            return (
                <Box sx={{display: 'flex', width: '100%', minWidth: 250, bgcolor: 'background.paper'}}>
                    <nav aria-label="main mailbox folders">
                        <List>
                            {loadedVideos.data.map((video) => {
                                return (
                                    <VideoItem key={video.videoId} videoId={video.videoId} videoName={video.videoName}
                                               videoRawUrl={video.videoRawUrl}
                                               videoDetectUrl={video.videoDetectUrl}
                                               videoClassifyUrl={video.videoClassifyUrl}
                                               displayVideo={() => {
                                                   setVideoFilePath(video.videoRawUrl)
                                                   setBtnLoading(false)
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

    if (isLoading) {
        return (
            <section>
                <p>Loading ...</p>
            </section>
        )
    }

    return (
        <section className="home">
            <Navbar/>
            <div>
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
                                <Typography textAlign={"center"}
                                            sx={{
                                                color: 'white'
                                            }}
                                            variant={"h5"}>
                                    Raw Video
                                </Typography>
                                <ReactPlayer playing={true} muted={true} width={"100%"} className="player" controls
                                             url={videoFilePath}/>
                                <ThemeProvider theme={theme}>
                                    <Stack spacing={2} direction="row">
                                        <LoadingButton
                                            size="small"
                                            color={detectionUrl === null ? "success" : "error"}
                                            onClick={detectionClick}
                                            loading={loading}
                                            loadingPosition="start"
                                            startIcon={<SendIcon/>}
                                            variant="contained"
                                            disabled={detectionUrl === null ? false : true}
                                        >
                                            Object Detection
                                        </LoadingButton>
                                        <LoadingButton
                                            size="small"
                                            color={recognitionUrl === null ? "success" : "error"}
                                            onClick={recognitionClick}
                                            loading={loading}
                                            loadingPosition="start"
                                            startIcon={<SendIcon/>}
                                            variant="contained"
                                            disabled={recognitionUrl === null ? false : true}
                                        >
                                            Action Recognition
                                        </LoadingButton>
                                    </Stack>
                                </ThemeProvider>
                            </Grid>
                        </>
                    }
                </Grid>
            </div>
        </section>

    );
};
export default Classify;