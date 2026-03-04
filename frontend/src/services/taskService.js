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
};
