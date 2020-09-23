import React, { useState, useEffect, useRef, Component } from 'react';
import './styles/App.css';
import axios from 'axios';

import config from '../config';



function ImageUpload() {

    //const [Image, setImage] = useState('')

    const ImageChange = event => {
        const newImage = event.target.files[0]
        console.log(newImage);
    }

    const uploadImage = event => {
        //event.preventDefault();
        const data = "abcd"
        axios.post(config.SERVER_URL + '/image', {
            image: data
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    


    return (
        <div>
            <div>
                This is the image upload page
		    </div>
            <div className="ImageInput">
                <input type="file" onChange={ImageChange} />
                <button onClick={uploadImage}>Upload</button>
            </div>
            <div className="pulledImage">
                
            </div>
        </div>

    );

}



export default ImageUpload;
