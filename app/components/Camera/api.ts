import axios from "axios";

const AZURE_FACE_URL = "https://australiaeast.api.cognitive.microsoft.com";
const AZURE_FACE_KEY = "9f84aa8a60224fd98b1f34c1951d7ed1";

export default function detectFace(base64Data:string){
    let buffer = Buffer.from(base64Data, "base64");

    return axios.post(`${AZURE_FACE_URL}/face/v1.0/detect`, buffer, {
        headers:{
          "Ocp-Apim-Subscription-Key": AZURE_FACE_KEY,
          "Content-Type": "application/octet-stream",
        }
      })
}