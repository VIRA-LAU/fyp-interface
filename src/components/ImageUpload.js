import React, {useState, useEffect, useRef} from 'react';
import {Button} from 'react-bootstrap';


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
            setFile(pickedFile);
            props.setImg(pickedFile);
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
                        <Button></Button>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );

}
export default ImageUpload;