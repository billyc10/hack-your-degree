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

        e.preventDefault();
        const newImage = e.target.files[0];
        console.log(newImage);
        const newImageName = e.target.files[0].name;
        //setImage(e.target.files[0]);
      //  setImageName(e.target.files[0].name);
       // console.log(e.target.files[0]);
       // console.log(e.target.files[0].name);


        const imageData = new FormData();
        imageData.append('file', e.target.files[0]);

        console.log(imageData);
        // Send new poll to API
        axios.post(config.SERVER_URL + '/upload', imageData, {

            headers: {
                'Content-Type':'multipart.form-data'
            }
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
