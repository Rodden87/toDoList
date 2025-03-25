import { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../services/taskService";
import { logoutUser } from "../services/authService";
import { TaskCreator } from "./TaskCreator";

const Tasks = ({ setUserAuthenticated }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Error cargando tareas", error);            
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const toggleTask = async (id, done) => {
        await updateTask(id, !done);
        fetchTasks();
    };

    const removeTask = async (id) => {
        await deleteTask(id);
        fetchTasks();
    };

    return (
        <div>
            <h2>Lista de Tareas</h2>
            <TaskCreator refreshTasks={fetchTasks}/>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
                            {task.name}
                        </span>
                        <div className="task-buttons">
                        <button onClick={() => toggleTask(task._id, task.done)}>✔</button>
                        <button onClick={() => removeTask(task._id)}>❌</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={() => { logoutUser(); setUserAuthenticated(false); }}>
                Cerrar Sesión
            </button>
        </div>
    );
};

export default Tasks;