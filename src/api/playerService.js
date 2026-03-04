import axios from "axios";

//const API = "http://localhost:8080/v1/players";
const API = "http://192.168.1.4:8080/v1/players"

export const getPlayers = () => axios.get(`${API}/all`);

export const createPlayer = (player) => axios.post(API, player);

export const deletePlayer = (id) => axios.delete(`${API}/${id}`);

export const updatePlayer = (id, player) =>
  axios.put(`${API}/${id}`, player);