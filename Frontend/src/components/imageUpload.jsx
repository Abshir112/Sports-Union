import React, { useState} from "react";


function ImageUpload() {

    const [image, setImage] = useState("");

    function convertBase64(e) {
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result); //image in base64
            setImage(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
        return (
            <div className="auth-wrapper">
                <div className="auth-inner" style={{width: "auto"}}>
                    Upload Image
                    <input 
                    accept="image/*"
                    type="file"
                    onChange={convertBase64}
                    />
                    {image===""?null:<img src={image} style={{width: "100px", height: "100px"}}/>}
                </div>
            </div>
        );
    }

export default ImageUpload;