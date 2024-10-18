import React from 'react'
import { FaVideo } from "react-icons/fa6";
const StreamBtn = () => {
    return ( 
        <button className="Btn">
            <div className="sign"><FaVideo /></div>
            <div className="text">Stream</div>
        </button>
    )
}

export default StreamBtn
