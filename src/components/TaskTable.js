import { TaskRow } from "./TaskRow";

export const TaskTable = ({ tasks, toggleTask, showCompleted = false }) => {
  const taskTableRows = (doneValue) => {
    return tasks
      .filter((task) => task.done === doneValue)
      .map((task) => (
        <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
      ));
  };

  return (
    <table className="table table-hover table-bordered">
      <thead className="bg-primary text-white">
        <tr>
          <th className="text-center">Tasks</th>
        </tr>
      </thead>
      <tbody>{taskTableRows(showCompleted)}</tbody>
    </table>
  );
};