import React, {useEffect, useState} from 'react';
import ImageUpload from '../ImageUpload';
import {getFirestore, addDoc, collection} from "firebase/firestore";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import fire from "../../fire";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {RingLoader} from 'react-spinners';
import Navbar from "../Navbar/Navbar";

const Players = () => {
    const url = "https://stats-service-fyp-vira.herokuapp.com/api/v1/players"
    const db = getFirestore(fire);

    //Create a root reference
    const storage = getStorage();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        imageURL: ""
    });

    const [image, setImg] = useState();
    let [loading, setLoading] = useState(false);
    const style = {
        display: "block",
        margin: "0 auto",
        borderColor: "red"
    };
    let progress;
    useEffect(() => {
        if (progress < 99) {
            setLoading(true);
        }
    });

    function handleChange(e) {
        e.preventDefault();
        const {name, value} = e.target;
        setData((prev) => {
            console.log(prev)

            return {...prev, [name]: value};
        })
    }

    function uploadImage(img) {
        console.log("Image name: " + img.name);
        const storageRef = ref(storage, `/images/${img.name}`)
        const uploadTask = uploadBytesResumable(storageRef, img);
        const playersCollection = collection(db, '/players');
        uploadTask.on("state_changed", (snapshot) => {
                progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            }, (err) => console.log(err),
            async () => {

                const response = await getDownloadURL(uploadTask.snapshot.ref)

                console.log(response)
                const payload = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    imageUrl: response
                }
                console.log("payload", payload)
                axios.post(url, payload)
                    .then(function (response) {
                        setLoading(false);
                        console.log(response);
                    })
            }
        );
    }

    async function addPlayer(e) {
        e.preventDefault();
        await uploadImage(image);
        console.log(data);
        setData({
            firstName: "",
            lastName: "",
            email: "",
            imageURL: ""
        });
        //this.$emit('addPlayerEvent');
        setLoading(true);
        console.log(loading);


    }
    useNavigate();
    return (
        <section className="home2">
               <Navbar/>
                <div style={{display: "flex", paddingTop: "50px", justifyContent: "center"}}>
                    <div className="player-container" id="player-container">
                        <div className="form-container registration-container">
                            <form action="#">
                                {loading && <RingLoader color="#603bbb" style={style} size={150}/>}
                                <input type="text" onChange={handleChange} placeholder="First Name" name="firstName"
                                       value={data.firstName}/>
                                <input type="text" onChange={handleChange} placeholder="Last Name" name="lastName"
                                       value={data.lastName}/>
                                <input type="email" onChange={handleChange} placeholder="Email" name="email"
                                       value={data.email}/>
                                <button className="registrationBtn" style={{marginTop: "10px"}}
                                        onClick={addPlayer}>Add
                                </button>

                                <div className="overlay">
                                    <div className="overlay-panel">
                                        <ImageUpload setImg={setImg}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
    );
};

export default Players;