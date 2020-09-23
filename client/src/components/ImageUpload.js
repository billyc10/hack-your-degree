import React, { useState, useEffect, useRef, Component } from 'react';
import './styles/App.css';
import axios from 'axios';

import config from '../config';



function ImageUpload() {

    const [Image, setImage] = useState('');
    const [ImageName, setImageName] = useState('')



    const ImageChange = (e) => {
        const newImage = e.target.files[0]
        console.log(newImage);
    }

    const uploadImage = (e) => {

        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
        console.log(e.target.files[0]);
        console.log(e.target.files[0].name);

        e.preventDefault();

        const formData = new FormData();
        formData.append('file', Image);
        //formData.append("test");

        // Send new poll to API
        axios.post(config.SERVER_URL + '/setImage', {
            file: formData
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });


    };




    return (
        <div>
            <div>
                This is the image upload page
		    </div>
            <div className="ImageInput">
                <input type="file" onChange={uploadImage} />
                <button>Upload</button>
            </div>
        </div>

    );

}



export default ImageUpload;
