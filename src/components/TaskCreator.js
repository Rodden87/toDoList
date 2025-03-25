import { useState } from "react";
import { createTask } from "../services/taskService";

export const TaskCreator = ({ refreshTasks }) => {
  const [newTaskName, setNewTaskName] = useState("");

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    if (!newTaskName.trim()) return;

    try {
      await createTask(newTaskName);
      setNewTaskName("");
      refreshTasks();
    } catch (error){
      console.error("Error al crear la tarea", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='my-2 row'/*El formulario tiene un atributo onSubmit, que por lo gral envia los datos ingresados a un backend*/> 
      <div className="col-9">
        <input /*Creación de la caja que recibe la tarea*/
          type="text"
          placeholder="Enter a new Task"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}//Esta fx recibe el evento (e), y se activa cuando se escribe una tarea por que cambia (onChange), mientras que target es lo que captura el valor, es lo que necesito capturar; la tarea. Y a traves de la fx (setNewTaskName) se llena la variable (newTaskName)
          className='form-control'
        />
      </div>
      <div className="col-3"/*Creación del botón que guarda la tarea*/>
        <button className="btn btn-primary btn-sm">Save Task</button>
      </div>
    </form>
  );
};
