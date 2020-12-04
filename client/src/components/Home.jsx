import React, { useEffect, useState } from 'react';
import QRCode from "qrcode.react";
import Input from "./Input";
import Popup from "./Popup";
import "../css/input.css";

function Home() {
    const [imgURL, setImgURL] = useState("");
    const [qrId, setQrId] = useState();
    const [usePopUp, setUsePopup] = useState(false);

    function generateQR() {
        postToSQL();
        setUsePopup(true);
    }

    useEffect(() =>{
        setImgURL(qrId);
    },[qrId])
    

    async function postToSQL() {
        const id = new Date().getTime();
        setQrId(id);        
        const name = document.getElementById("nameInput").value;
        console.log(name);
        const sendData = await fetch('/file', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, id: id })
        });
        const content = await sendData.json();

        // console.log(content);
    }

    function setDefault(){
        console.log("Default home");
        setUsePopup(false);
    }    

    return (
        <div className="home-container">            
            <Input id="nameInput" placeholder="Name" type="text" />
            <button className="btn" onClick={generateQR}>Generate</button>
            {/* <button onClick={copyQR}>Copy</button> */}
            {/* <button onClick={generateQR}>Create</button>
            {console.log(createQR)}
            <img src={imgURL} /> */}
            {/* {imgURL ? <QRCode id="qrcode" className="qrcode" value={'http://192.168.0.130:3000/' + imgURL} /> : <i />} */}
            <img style={{ display: "none" }} id="converted" src="" alt="" />
            {usePopUp ? <Popup imgURL={imgURL} setDefault={setDefault} isQrCode={usePopUp}/> : <i />}
        </div>
    );
}

export default Home;
