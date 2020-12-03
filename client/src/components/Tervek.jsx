import React, { useEffect, useState } from 'react';
import QRCode from "qrcode.react";

function Tervek(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState({});
    const [imgURL, setImgURL] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch('/files/' + props.match.params.fileID)
            .then((response) => response.json())
            .then((datas) => {
                setLoading(false);
                setData(datas);
            })
            .catch((e) => {
                setLoading(false);
                setError('fetch failed');
            });
    }, []);

    if (loading) {
        return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>;
    }

    if (error !== '') {
        return <p>ERROR: {error}</p>;
    }

    function generateQR() {        
        setImgURL(data.id);
    }
    
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

    return (
        <div>            
            <h2 key={data.id}>Name: {data.name}, id: {data.id}</h2>;
            <button onClick={generateQR}>Generate</button>
            <button onClick={copyQR}>Copy</button>
            {/* <button onClick={generateQR}>Create</button>
            {console.log(createQR)}
            <img src={imgURL} /> */}            
            {imgURL ? <QRCode id="qrcode" className="qrcode" value={'' + imgURL} /> : <i />}
            <img style={{display: "none"}} id="converted" src="" alt="" />

        </div>
    );
}

export default Tervek;
