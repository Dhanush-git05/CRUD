import axios from "axios";

const API = "http://localhost:8000/users";

export const getUsers = () => axios.get(API);

export const addUser = (data) => axios.post(API, data);

export const updateUser = (id, data) => axios.patch(`${API}/${id}`, data);

export const deleteUser = (id) => axios.delete(`${API}/${id}`);