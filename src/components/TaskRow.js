export const TaskRow = ({ task, toggleTask }) => {
  return (
    <tr className="task-row">
      <td className="d-flex justify-content-between align-items-center p-2 bg-secondary text-white rounded">
        <span className={task.done ? "text-decoration-line-through" : ""}>
          {task.name}
        </span>
        <input
          type="checkbox"
          className="form-check-input border-light"
          checked={task.done}
          onChange={() => toggleTask(task)}
        />
      </td>
    </tr>
  );
};