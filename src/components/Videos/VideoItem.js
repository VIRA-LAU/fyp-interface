import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function VideoItem(props) {



    return (
        <ListItem disablePadding onClick={props.displayVideo}>
            <ListItemButton>
                <ListItemIcon>
                    <VideoLibraryIcon/>
                </ListItemIcon>
                <ListItemText primary={props.videoName}/>
            </ListItemButton>
        </ListItem>
    )
}

export default VideoItem;