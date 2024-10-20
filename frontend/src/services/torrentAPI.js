import {torrentEndpoints} from './apis'
import { apiConnector } from './apiConnector'

export const download = async (magnet) => {
    try {
        console.log("Magnet IN Connector ->",magnet)
        const response = await apiConnector("POST", torrentEndpoints.DOWNLOAD_API, {magnet});
        console.log(torrentEndpoints.DOWNLOAD_API);
        console.log("Download response -> ", response)
        if(!response.data.success) throw new Error(response.data.message);
    }   
    catch(err) {
        console.log("In Connector",err.message)
    } 
}