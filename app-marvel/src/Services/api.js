import axios from "axios";
import md5 from "md5";

// const baseURL = "http://gateway.marvel.com/v1/public/characters?";
const publicKey = "4046dce2b1edab6cb93638c57b218244";
const privateKey = "033bd267d54e79ca5f1770f357596c75c726ed29";
const time = Number(new Date());
const hash = md5(time + privateKey + publicKey)

const api = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public/',
    params: {
        ts: time,
        apikey: publicKey,
        hash: hash
    }
})

export default api