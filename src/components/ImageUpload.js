import React, {useState, useEffect, useRef} from 'react';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil"; 
import Resizer from "react-image-file-resizer";

function ImageUpload(props){
    const [file, setFile]=useState();
    const [previewUrl, setPreviewUrl]=useState();
    const filePickerRef=useRef();

    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader= new FileReader();
        fileReader.onload=()=>{
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    },[file]);
    function pickedHandler(event){
        let pickedFile;
        if(event.target.files && event.target.files.length===1){
            pickedFile=event.target.files[0]; 
            if(pickedFile.size > 4194304){ //x*1024*1024 --> x MB 
                alert("The file you want to upload is too big. Maximum Upload Size = 4 MB");
            }else{
            setFile(pickedFile);
            props.setImg(pickedFile);
            }
        }
    }

    function pickedImageHandler(){
        filePickerRef.current.click();
    }

    return(
        <div className="form-control center">
            <input
            id={props.id}
            ref={filePickerRef}
            style={{display: "none"}}
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={pickedHandler}/>
            <div className={`image-upload ${props.center && "center"}`}>
                <div className="image-upload_preview">
                    {previewUrl && <img src={previewUrl} alt="preview"/>}
                    {!previewUrl && (
                        <div className="center">
                            <Button className="image-upload-button" type="button" onClick={pickedImageHandler}>+</Button>
                        </div>
                    )}
                </div>
                <div>
                    {previewUrl && (
                    <div className="center">
                        <Button onClick={pickedImageHandler}>
                            <FontAwesomeIcon icon={faPencil} />
                        </Button>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );

}
export default ImageUpload;