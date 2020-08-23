import Axios from "axios";

const SERVER_URL = process.env.VUE_APP_SERVER_URL;

export default Axios.create({
    baseURL: SERVER_URL,
});

export function fetchImage(relativeUrl) {
    return `${SERVER_URL}${relativeUrl}`;
}
