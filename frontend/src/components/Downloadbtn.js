import React from 'react'
import { FaDownload } from "react-icons/fa6";
import {download} from '../services/torrentAPI'

const Downloadbtn = ({magnet}) => {
    const downloadHandler = () => {
        console.log("Searching for ->",magnet);
        download(magnet);
    }
    return (
        <button className="Btn Btn2 flex" onClick={downloadHandler}>
            <div className="sign flex place-self-start"><FaDownload size={24}/></div>
            <div className="text">Download</div>
        </button>
    )
}

export default Downloadbtn
