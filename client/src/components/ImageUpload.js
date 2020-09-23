import React, { useState, useEffect, useRef, Component } from 'react';
import './styles/App.css';
import axios from 'axios';






function ImageUpload() {

//const [Image, setImage] = useState('')

    const ImageChange = event => {
        const newImage = event.target.files[0]
        console.log(newImage);
    }

  
        return (
            <div>
                <div>
                    This is the image upload page
		    </div>
                <div className="ImageInput">
                    <input type="file" onChange={ImageChange} />
                    <button onClick={() => console.log("a")}>Upload</button>
                </div>
            </div>

        );
    
}



export default ImageUpload;