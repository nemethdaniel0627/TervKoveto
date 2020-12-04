import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";

export default function Popup(props) {
    const [isCopied, setIsCopied] = useState(false)

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
        setIsCopied(true)
        const qrCanvas = document.getElementById("qrcode");
        const dataURI = qrCanvas.toDataURL();
        const convertedIMG = document.getElementById("converted");

        // console.log(dataURI);
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
        // setDefault();
    }    
    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    useEffect(() => {
        if (isCopied) {
            console.log("start");
            setTimeout(() => {
                props.setDefault();
                setIsCopied(false);
                console.log("end");
            }, 1000);
                    
        }
    }, [isCopied])

    return (

        <div className={!isCopied ? "popup-container-in" : "popup-container-out"}>
            <div className={!isCopied ? "popup-item-container-in" : "popup-item-container-out"}>
                <h1>Friss, és ropogós</h1>
                {props.isQrCode ? <QRCode id="qrcode" className="qrcode" value={'http://192.168.0.130:3000/files/' + props.imgURL} /> : <i />}
                <button onClick={copyQR} className="btn btn-copy">Másolás</button>
            </div>
        </div>
    )
}