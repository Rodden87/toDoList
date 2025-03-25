import axios from "axios";

const API_URL = "http://localhost:5000/auth";

// Registrar Usuario
export const registerUser = async (username, password) => {
    try {
        const res = await axios.post(`${API_URL}/register`, { username, password });
        localStorage.setItem("token", res.data.token);
        return res.data;
    } catch (error) {
        console.error("Error en el registro: ", error.response?.data);
        throw error;
    }
};

// Iniciar Sesión
export const loginUser = async (username, password) => {
    try {
        const res = await axios.post(`${API_URL}/login`, { username, password });
        localStorage.setItem("token", res.data.token);
        return res.data;
    } catch (error) {
        console.error("Error al iniciar sesión: ", error.response?.data);
        throw error;
    }
};

export const logoutUser = () => {
    localStorage.removeItem("token");
};

// Obtener Token
export const getToken = () => localStorage.getItem("token");