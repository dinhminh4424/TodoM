import Task from "../models/task.js";

class TaskController {
  async getAllTask(req, res) {
    try {
      const tasks = await Task.find().sort({ createdAt: -1 });
      const activeCount = await Task.countDocuments({ status: "active" });
      const completedCount = await Task.countDocuments({ status: "completed" });

      return res.status(200).json({
        success: true,
        message: "Bạn đã lấy danh sách Tasks Thành Công!",
        tasks,
        activeCount,
        completedCount,
      });
    } catch (error) {
      console.error("Lỗi khi lấy toàn bộ danh sách Task: ", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi khi lấy toàn bộ danh sách Task:" + error,
      });
    }
  }

  async getTaskById(req, res) {
    try {
      const { idTask } = req.params;

      const task = await Task.findById(idTask);

      return res.status(200).json({
        success: true,
        message: "Bạn đã lấy Tasks Thành Công!",
        task,
      });
    } catch (error) {
      console.error("Lỗi khi lấy Task theo ID: ", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi khi lấy Task theo ID: " + error,
      });
    }
  }

  async createTask(req, res) {
    try {
      const { title } = req.body;

      const task = await Task.create({
        title,
      });

      return res.status(200).json({
        success: true,
        message: "Bạn đã tạo Task Thành Công!",
        task,
      });
    } catch (error) {
      console.error("Lỗi khi tạo Task: ", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi khi tạo Task: " + error,
      });
    }
  }

  async updateTask(req, res) {
    try {
      const { title, status } = req.body;

      const { idTask } = req.params;

      const task = await Task.findById(idTask);
      if (!task) {
        console.error("Lỗi cập nhật Task: Không Tìm Thấy Task ");
        return res.status(400).json({
          success: false,
          message: "Lỗi cập nhật Task: Không Tìm Thấy Task ",
        });
      }

      const updateTask = await Task.findByIdAndUpdate(
        idTask,
        {
          title: title,
          status: status,
        },
        { new: true },
      );

      return res.status(200).json({
        success: true,
        message: "Bạn đã cập nhật Task Thành Công!",
        task: updateTask,
      });
    } catch (error) {
      console.error("Lỗi cập nhật Task: ", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi cập nhật Task: " + error,
      });
    }
  }

  async deleteTask(req, res) {
    try {
      const { idTask } = req.params;

      const task = await Task.findById(idTask);
      if (!task) {
        console.error("Lỗi xoá Task: Không Tìm Thấy Task ");
        return res.status(400).json({
          success: false,
          message: "Lỗi xoá Task: Không Tìm Thấy Task ",
        });
      }

      await Task.deleteOne({
        _id: idTask,
      });

      return res.status(200).json({
        success: true,
        message: "Bạn đã xoá Task Thành Công!",
      });
    } catch (error) {
      console.error("Lỗi xoá Task: ", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi xoá Task: " + error,
      });
    }
  }
}

export default new TaskController();
