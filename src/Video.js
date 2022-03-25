import React, {useState} from "react";
import ReactPlayer from "react-player";


function Video() {
    const [videoFilePath, setVideoFilePath] = useState(null);
    const handleVideoUpload = (event) => {
        setVideoFilePath(URL.createObjectURL(event.target.files[0]));
    };
    return (
        <div>
            <input className="player" type="file" onChange={handleVideoUpload} />
            <div>
                <ReactPlayer className="player" controls url={videoFilePath}/>
            </div>

        </div>
    )
}

export default Video;