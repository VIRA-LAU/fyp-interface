import Navbar from "../Navbar/Navbar";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Grid, List, Stack, ThemeProvider, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import VideoItem from "../Videos/VideoItem";
import ReactPlayer from "react-player";
import SendIcon from '@mui/icons-material/Send';
import {LoadingButton} from "@mui/lab";
import {createTheme} from '@material-ui/core/styles'
import {useSnackbar} from "notistack";
import ButtonsContext from "./ButtonsContext";


const Classify = () => {
    const url = "https://stats-service-fyp-vira.herokuapp.com/api/v1/Get-Unprocessed"
    const [loadedVideos, setLoadedVideos] = useState();
    const [videoName, setVideoName] = useState();
    const [isLoading, setLoading] = useState(true)
    const [videoFilePath, setVideoFilePath] = useState(null);

    const [detectionUrl, setDetectionUrl] = useState(null);
    const [recognitionUrl, setRecognitionUrl] = useState(null);

    const [detection, setDetection] = useState(null);
    const [classification, setClassification] = useState(null);
    const [assigned, setAssigned] = useState(null);

        const {enqueueSnackbar} = useSnackbar();


        const {
            detectVideo,
            setDetectVideo,
            detectBtnloading,
            setdetectBtnloading,
            classifyVideo,
            setClassifyVideo,
            classifyBtnloading,
            setclassifyBtnloading
        } = useContext(ButtonsContext)
        // const [detectBtnloading, setdetectBtnloading] = useState(false);
        // const [classifyBtnloading, setclassifyBtnloading] = useState(false);


    function detectionClick() {
        console.log('Detection Pressed');
        // console.log(videoName)
        setdetectBtnloading(true);
        if (!detectBtnloading) {
            setDetectVideo(videoName)
            axios.get(`http://localhost:8000/api/v1/public/process-videoUrl/` + videoName).then(r => {
                    console.log(r);
                    setdetectBtnloading(false);
                }).catch(() => {
                setdetectBtnloading(false);
            })
        } else {
            enqueueSnackbar('Another video is being processed!', {variant: "warning"})
        }
    }

    function recognitionClick() {
        console.log('Action Pressed');
        setclassifyBtnloading(true);
        if (!classifyBtnloading) {
            setClassifyVideo(videoName)
            axios.get(`http://localhost:9000/api/v1/public/classify-videoUrl/` + videoName).then(r => {
                console.log(r);
                setclassifyBtnloading(false);
            }).catch(() => {
                setclassifyBtnloading(false);
            })
        } else {
            enqueueSnackbar('Another video is being classified!', {variant: "warning"})
        }
    }

    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('This is a success message!', { variant });
    };


    useEffect(async () => {
        console.log("fetching videos again")
        setLoading(true)
        const response = await axios.get(url);
        setLoadedVideos(response);
        setLoading(false)

        console.log(response)

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
                                                   setClassification(video.videoClassifyUrl)
                                                   setDetection(video.videoDetectUrl)
                                                   setAssigned(video.videoAssignedName)
                                                   setVideoName(video.videoName)


                                                   setDetectionUrl(video.videoDetectUrl)
                                                   setRecognitionUrl(video.videoClassifyUrl)
                                                   console.log("video clicked is " + video.videoName)
                                                   console.log("detection", detection)
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
                <Grid container  marginTop={2} spacing={3}>
                    <div style={{
                        display: 'flex'
                    }}>



                        {renderVideos()}

                    </div>
                    {
                        videoFilePath &&
                        <>
                            <Grid item xs={10}>
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
                                    <Stack style={{justifyContent: "center"}} spacing={2} direction="row">
                                        <LoadingButton
                                            size="small"
                                            color={detectionUrl === null ? "success" : "error"}
                                            onClick={detectionClick}
                                            loading={videoName === detectVideo ? detectBtnloading : false}
                                            loadingPosition="start"
                                            startIcon={<SendIcon/>}
                                            variant="contained"
                                            style={{width: '20%'}}
                                            disabled={detectionUrl === null ? false : true}
                                        >
                                            Object Detection
                                        </LoadingButton>
                                        <LoadingButton
                                            size="small"
                                            color={recognitionUrl === null ? "success" : "error"}
                                            onClick={recognitionClick}
                                            loading={videoName === classifyVideo ? classifyBtnloading : false}
                                            loadingPosition="start"
                                            startIcon={<SendIcon/>}
                                            style={{width: '20%'}}
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
                <Grid style = {{display: 'flex', justifyContent: 'end', paddingRight:'115px'}} container  marginTop={3} spacing={3}>
                {
                    videoFilePath && detection &&
                    <>
                        <Grid item xs={10}>
                            <div>
                            <Typography textAlign={"center"}
                                        sx={{
                                            color: 'white'
                                        }}
                                        variant={"h5"}>
                                Detection Video
                            </Typography>

                            <ReactPlayer playing={true} muted={true} width={"100%"} className="player" controls
                                         url={detection}/>
                            </div>
                        </Grid>
                    </>
                }

                </Grid>

                <Grid style = {{display: 'flex', justifyContent: 'end', paddingRight:'115px'}}  container marginTop={3} spacing={3}>
                    {
                        videoFilePath && classification &&
                        <>
                            <Grid item xs={10}>
                                <Typography textAlign={"center"}
                                            sx={{
                                                color: 'white'
                                            }}
                                            variant={"h5"}>
                                    Classification Video
                                </Typography>
                                <ReactPlayer playing={true} muted={true} width={"100%"} className="player" controls
                                             url={classification}/>
                            </Grid>
                        </>
                    }

                </Grid>


                <Grid style = {{display: 'flex', justifyContent: 'end', paddingRight:'115px'}}  container marginTop={5} spacing={3}>
                    {
                        videoFilePath && assigned &&
                        <>
                            <Grid item xs={10}>
                                <Typography textAlign={"center"}
                                            sx={{
                                                color: 'white'
                                            }}
                                            variant={"h5"}>
                                    Assigned Video
                                </Typography>
                                <ReactPlayer playing={true} muted={true} width={"100%"} className="player" controls
                                             url={assigned}/>
                            </Grid>
                        </>
                    }

                </Grid>

            </div>
        </section>

    );
};
export default Classify;
