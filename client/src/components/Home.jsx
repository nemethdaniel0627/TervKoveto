import React, { useEffect, useState } from 'react';
import QRCode from "qrcode.react";
import Input from "./Input";
import "../css/input.css";

function Home() {
    const [imgURL, setImgURL] = useState("");
    const [qrId, setQrId] = useState()

    function generateQR() {
        postToSQL();        
    }

    useEffect(() =>{
        setImgURL(qrId);
    },[qrId])

    function base64toBlob(base64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 1024;
        var byteCharacters = atob(base64Data);
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);

        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);

            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: contentType });
    }

    async function copyQR() {
        const qrCanvas = document.getElementById("qrcode");
        const dataURI = qrCanvas.toDataURL();
        const convertedIMG = document.getElementById("converted");

        console.log(dataURI);
        convertedIMG.src = dataURI;

        var block = dataURI.split(";");
        // Get the content type of the image
        var contentType = block[0].split(":")[1];// In this case "image/gif"
        // get the real base64 content of the file
        var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

        // Convert it to a blob to upload
        var blob = base64toBlob(realData, contentType);

        const cbi = new ClipboardItem({
            'image/png': blob
        });
        await navigator.clipboard.write([cbi]);
    }

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

        console.log(content);
    }

    return (
        <div className="home-container">            
            <Input id="nameInput" placeholder="Name" type="text" />
            <button onClick={generateQR}>Generate</button>
            <button onClick={copyQR}>Copy</button>
            {/* <button onClick={generateQR}>Create</button>
            {console.log(createQR)}
            <img src={imgURL} /> */}
            {imgURL ? <QRCode id="qrcode" className="qrcode" value={'' + imgURL} /> : <i />}
            <img style={{ display: "none" }} id="converted" src="" alt="" />

        </div>
    );
}

export default Home;
