import AddTask from "@/components/AddTask";
import DateTimeFilters from "@/components/DateTimeFilters";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import { visibleTaskList } from "@/lib/data";
import { TaskService } from "@/services/taskService";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [filterDateTime, setFilterDateTime] = useState("all");
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await TaskService.getAllTask();

  //       console.log("res: ", res);

  //       setActiveTaskCount(res.activeCount);
  //       setCompleteTaskCount(res.completedCount);

  //       const tasks = res?.tasks ?? [];

  //       setTaskBuffer([...tasks]);
  //     } catch (error) {
  //       toast.error("Lỗi khi lấy dữ liệu filter: ", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPage(1);
        const res = await TaskService.getAllTaskByFilter(
          filter,
          filterDateTime,
        );

        console.log("res: ", res);

        setActiveTaskCount(res.activeCount);
        setCompleteTaskCount(res.completedCount);

        const tasks = res?.tasks ?? [];

        setTaskBuffer([...tasks]);
      } catch (error) {
        toast.error("Lỗi khi lấy dữ liệu filter: ", error);
      }
    };

    fetchData();
  }, [filter, filterDateTime]);

  const handleAddTask = async (name) => {
    try {
      const res = await TaskService.addTask(name);

      console.log("task new:  ", res.task);

      if (!res.task) {
        return;
      }

      if (res.task.status === "active") {
        setActiveTaskCount(activeTaskCount + 1);
      } else {
        setCompleteTaskCount(completeTaskCount + 1);
      }

      setTaskBuffer((prev) => {
        return [res.task, ...prev];
      });
    } catch (error) {
      toast.error("Lỗi khi add task: ", error);
    }
  };

  const handleDeleteTask = async (idTask) => {
    try {
      await TaskService.deleteTask(idTask);

      setTaskBuffer((prev) => {
        return prev.filter((item) => {
          return item._id !== idTask;
        });
      });

      toast.success("Xoá task thành công");
    } catch (error) {
      console.error("Lỗi khi xoá task: " + error);
      toast.error("Lỗi khi xoá task: ", error);
    }
  };

  const handleUpdateTask = async (task) => {
    try {
      console.log("task: ", task);
      setTaskBuffer((prev) => {
        return prev.map((item) => {
          return item._id !== task._id ? item : task;
        });
      });

      toast.success("Cập nhật thành công");
    } catch (error) {
      console.error("Lỗi khi xoá task: " + error);
      toast.error("Lỗi khi xoá task: ", error);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const res = await TaskService.toggleTask(taskId);
      const task = res.task;

      setTaskBuffer((prev) => {
        return prev.map((item) => {
          return item._id !== task._id ? item : task;
        });
      });

      let status = task.status;
      if (status === "active") {
        setActiveTaskCount(activeTaskCount + 1);
        setCompleteTaskCount(completeTaskCount - 1);
      } else {
        setActiveTaskCount(activeTaskCount - 1);
        setCompleteTaskCount(completeTaskCount + 1);
      }

      toast.success(
        `Task: ${task.title}  -  ` +
          `${status === "active" ? " Đang Thực Hiện" : " Đã Hoàn Thành"}`,
      );
    } catch (error) {
      console.error("Lỗi khi xoá task: " + error);
      toast.error("Lỗi khi xoá task: ", error);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (pageNew) => {
    if (pageNew >= 1 && pageNew <= totalPage) {
      setPage(pageNew);
    }
  };

  const visibleTasks = taskBuffer.slice(
    (page - 1) * visibleTaskList,
    page * visibleTaskList,
  );

  if (visibleTasks.length === 0) {
    handlePrev();
  }

  const totalPage = Math.ceil(taskBuffer.length / visibleTaskList);

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
            radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Đầu trang */}
          <Header />

          {/* Tạo nhiệm vụ */}
          <AddTask handleAddTask={handleAddTask} />

          {/* Thống kê và xoá bộ lọc */}
          <StatsAndFilters
            filter={filter}
            activeTaskCount={activeTaskCount}
            completeTaskCount={completeTaskCount}
            setFilter={setFilter}
          />

          {/* Danh sách nhiệm vụ */}
          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleDeleteTask={handleDeleteTask}
            handleUpdateTask={handleUpdateTask}
            handleToggleTask={handleToggleTask}
          />

          {/* Phân trang và đọc theo Date */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPage={totalPage}
            />
            <DateTimeFilters
              filterDateTime={filterDateTime}
              setFilterDateTime={setFilterDateTime}
            />
          </div>

          {/* Chân trang */}
          <Footer
            activeTaskCount={activeTaskCount}
            completeTaskCount={completeTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
