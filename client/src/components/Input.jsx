import React from "react";

export default function Input(props) {
    return (
        <div className="input-container">
            <input  id={props.id} placeholder=" " className="input" type={props.type} />
            <label htmlFor={props.id} className="input-placeholder">{props.placeholder}</label>    
        </div>
    )
}