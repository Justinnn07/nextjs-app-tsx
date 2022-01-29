import axios from "axios";
// axios default configs
const baseURL = "https://the-pulse-suite.herokuapp.com";
const instance = axios.create({ baseURL });

export default instance;
