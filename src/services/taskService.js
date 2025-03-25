import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:5000/tasks";

// Configurar Headers con el token JWT
const authHeader = () => ({
    headers: { Authorization: `Bearer ${getToken()}` }
});

// Obtener tareas del Usuario
export const getTasks = async () => {
    try {
        const res = await axios.get(API_URL, authHeader());
        return res.data;
    } catch (error) {
        console.error("Error al obtener tareas: ", error.response?.data);
        throw error;
    }
};

// Crear nueva tarea
export const createTask = async (name) => {
    try {
        const res = await axios.post(API_URL, { name }, authHeader());
        return res.data;
    } catch (error) {
        console.error("Error al crear tarea: ", error.response?.data);
        throw error;
    }
};

// Actualizar Tarea
export const updateTask = async (id, done) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, { done }, authHeader());
        return res.data;
    } catch (error) {
        console.error("Error al actualizar tarea: ", error.response?.data);
        throw error;
    }
};

//Eliminar Tarea
export const deleteTask = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/${id}`, authHeader());
        return res.data;
    } catch (error) {
        console.error("Error al eliminar tarea: ", error.response?.data);
        throw error;
    }
};
