import api from "@/lib/axios";

export const TaskService = {
  getAllTask: async () => {
    try {
      const res = await api.get("/api/tasks");

      console.log("/api/tasks: ", res.data);

      return res.data;
    } catch (error) {
      console.error("Lõi khi lấy danh sác task: ", error);
      throw error;
    }
  },

  getAllTaskByFilter: async (filter, filterDateTime) => {
    try {
      const res = await api.get("/api/tasks/byFilter", {
        params: { filter, filterDateTime },
      });

      return res.data;
    } catch (error) {
      console.error("Lõi khi lấy danh sác task: ", error);
      throw error;
    }
  },

  addTask: async (name) => {
    try {
      const res = await api.post("/api/tasks", { title: name });

      return res.data;
    } catch (error) {
      console.error("Lõi khi lấy danh sác task: ", error);
      throw error;
    }
  },

  deleteTask: async (idTask) => {
    try {
      const res = await api.delete(`/api/tasks/${idTask}`);

      return res.data;
    } catch (error) {
      console.error("Lõi khi xoá task: ", error);
      throw error;
    }
  },

  updateTask: async (idTask, title, status) => {
    try {
      const res = await api.put(`/api/tasks/${idTask}`, { title, status });

      return res.data;
    } catch (error) {
      console.error("Lõi khi cập nhật task: ", error);
      throw error;
    }
  },

  toggleTask: async (idTask) => {
    try {
      const res = await api.put(`/api/tasks/${idTask}/toggleTask`);

      return res.data;
    } catch (error) {
      console.error("Lõi khi cập nhật trạng thái status task: ", error);
      throw error;
    }
  },
};
