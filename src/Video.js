import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import SwiperCore, {EffectCoverflow, Navigation, Pagination, Autoplay} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {IMAGES} from "./utils/constants/images";
import {Autocomplete, Grid, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import Slide from "./components/Slide";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import './Video.css';
import {VIDEOS} from "./utils/constants/videos";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

SwiperCore.use([EffectCoverflow, Pagination, Autoplay, Navigation]);


function Video() {
    const theme = useTheme()

    const isSmall = useMediaQuery(theme.breakpoints.down('md'));

    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [selectedPlayer, setSelectedPlayer] = React.useState({
        name:'',
        id:''
    })

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };

    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? ['1', '5', '6', '7'] : [],
        );
    };

    const handleSelectClick = () => {
        setSelected((oldSelected) =>
            oldSelected.length === 0 ? ['1', '2', '3', '4', '5', '6', '7', '8', '9'] : [],
        );
    };

    const [videoFilePath, setVideoFilePath] = useState(null);
    const handleVideoUpload = (event) => {
        setVideoFilePath(URL.createObjectURL(event.target.files[0]));
    };

    useEffect(() => {
        if(selected[0]!==0){
            setVideoFilePath(VIDEOS[selected[0]-1])
        }
        else{
            setVideoFilePath(null)
        }
    },[selected])

    console.log(selectedPlayer)
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
                slidesPerView={isSmall? "1":"3"}
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
                {IMAGES.map(({src, name, id}, i) => {
                    return (
                        <SwiperSlide key={i}>
                            <Slide src={src} name={name} id={id}/>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <div
                style={{
                    padding:'10% 0'
                }}
            >
                <div style={{
                    display:'flex'
                }}>
                    <Box sx={{ display:'flex', minWidth:'150px',overflowY: 'auto', color:'white' }}>
                        <TreeView
                            aria-label="controlled"
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            expanded={expanded}
                            selected={selected}
                            onNodeToggle={handleToggle}
                            onNodeSelect={handleSelect}
                            multiSelect
                        >
                            <TreeItem nodeId="0" label="Videos">
                                {
                                    VIDEOS.map(({name,videos}, index) =>
                                        <TreeItem nodeId={index+1} label={name} />
                                    )
                                }
                            </TreeItem>
                        </TreeView>
                    </Box>
                    {
                        videoFilePath &&
                        <div style={{
                            margin:'0 auto',
                        }}>
                            <Typography textAlign={"center"} sx={{color:'white'}} marginRight={"150px"} variant={"h5"}>
                                The following video is being played: {videoFilePath.name}
                            </Typography>
                        </div>
                    }

                </div>

                <div>
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
                                        Base Video
                                    </Typography>
                                    <ReactPlayer playing={true} muted={true} width={"100%"} className="player" controls url={videoFilePath.videos.preprocessing.path}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography textAlign={"center"}
                                                sx={{
                                                    color: 'white'
                                                }}
                                                variant={"h5"}>
                                        Detection and Tracking
                                    </Typography>
                                    <ReactPlayer playing={true} muted={true} width={"100%"} className="player" controls url={videoFilePath.videos.tracking.path}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography textAlign={"center"}
                                                sx={{
                                                    color: 'white'
                                                }}
                                                variant={"h5"}>
                                       Action Classification
                                    </Typography>
                                    <ReactPlayer playing={true} muted={true} width={"100%"} className="player" controls url={videoFilePath.videos.classification.path}/>
                                </Grid>
                                <Grid item xs={12}>
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
                                                                        value={videoFilePath.personId}
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
                                                                minWidth: '45%' ,
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
                                                                            console.log(newInputValue,event)
                                                                            // setAmount(newInputValue);
                                                                        }}
                                                                        options={IMAGES}
                                                                        fullWidth
                                                                        getOptionLabel={(e) => e.name}
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
                                                                minWidth:  '45%',
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
                                                        {/*{*/}
                                                        {/*    error?*/}
                                                        {/*        <Typography variant="body1" style={{color: '#d32f2f',marginTop:'20px'}}>*/}
                                                        {/*            Invalid Address*/}
                                                        {/*        </Typography>*/}
                                                        {/*        :<></>*/}
                                                        {/*}*/}
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </>
                        }

                    </Grid>
                </div>
            </div>


        </div>
    )
}

export default Video;