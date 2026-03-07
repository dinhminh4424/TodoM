import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";
import { toast } from "sonner";

const TaskList = ({
  filteredTasks,
  filter,
  handleDeleteTask,
  handleUpdateTask,
  handleToggleTask,
}) => {
  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }

  const onDelete = async (idTask) => {
    try {
      handleDeleteTask(idTask);
    } catch (error) {
      console.error("Lỗi khi xoá task: " + error);
      toast.error("Lỗi khi xoá task: ", error);
    }
  };

  const onUpdate = async (task) => {
    try {
      handleUpdateTask(task);
    } catch (error) {
      console.error("Lỗi khi cập nhật task: " + error);
      toast.error("Lỗi khi cập nhật task: ", error);
    }
  };

  const onToggle = async (taskId) => {
    try {
      handleToggleTask(taskId);
    } catch (error) {
      console.error("Lỗi khi cập nhật status task: " + error);
      toast.error("Lỗi khi cập nhật status task: ", error);
    }
  };

  return (
    <div className="space-y-3 ">
      {filteredTasks.map((task, index) => {
        return (
          <TaskCard
            key={task._id ?? index}
            task={task}
            index={index}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onToggle={onToggle}
          />
        );
      })}
    </div>
  );
};

export default TaskList;
