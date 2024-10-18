import React from 'react'
import { FaDownload } from "react-icons/fa6";
const Downloadbtn = () => {
    return (
        <button className="Btn Btn2 flex">
            <div className="sign flex place-self-start"><FaDownload size={24}/></div>
            <div className="text">Download</div>
        </button>
    )
}

export default Downloadbtn
