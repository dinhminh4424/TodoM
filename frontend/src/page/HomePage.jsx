import AddTask from "@/components/AddTask";
import DateTimeFilters from "@/components/DateTimeFilters";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import { TaskService } from "@/services/taskService";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await TaskService.getAllTask();

        setActiveTaskCount(res.activeCount);
        setCompleteTaskCount(res.completedCount);
        setTaskBuffer([...res.tasks]);
      } catch (error) {
        toast.error("Lỗi khi lấy dữ liệu", error);
      }
    };

    fetchData();
  }, []);

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
          <AddTask />

          {/* Thống kê và xoá bộ lọc */}
          <StatsAndFilters
            activeTaskCount={activeTaskCount}
            completeTaskCount={completeTaskCount}
          />

          {/* Danh sách nhiệm vụ */}
          <TaskList filteredTasks={taskBuffer} />

          {/* Phân trang và đọc theo Date */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination />
            <DateTimeFilters />
          </div>

          {/* Chân trang */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
