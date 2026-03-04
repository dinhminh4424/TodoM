import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";

const TaskList = ({ filteredTasks }) => {
  let filter = "all";

  // const filteredTasks = [
  //   {
  //     _id: "1",
  //     title: "Học React",
  //     status: "active",
  //     completeAt: null,
  //     createdAt: new Date(),
  //   },
  //   {
  //     _id: "2",
  //     title: "Học js",
  //     status: "completed",
  //     completeAt: new Date(),
  //     createdAt: new Date(),
  //   },
  // ];

  if (!filteredTasks || filteredTasks.length === 0) {
    return <TaskEmptyState />;
  }

  return (
    <div className="space-y-3 ">
      {filteredTasks.map((task, index) => {
        return <TaskCard key={task._id ?? index} task={task} index={index} />;
      })}
    </div>
  );
};

export default TaskList;
