import Task from "../models/Task.js";

class TaskController {
  async getAllTask(req, res) {
    try {
      const result = await Task.aggregate([
        {
          $facet: {
            tasks: [{ $sort: { createAt: -1 } }],
            activeCount: [
              { $match: { status: "active" } }, // lọc
              { $count: "count" }, // $count: "count" với $count là phương thức đếm, "count" là tên key
            ],
            completedCount: [
              { $match: { status: "completed" } },
              { $count: "count" }, // $count: "count" với $count là phương thức đếm, "count" là tên key
            ],
          },
        },
      ]);

      const tasks = result[0].tasks;
      const activeCount = result[0].activeCount[0]?.count ?? 0;
      const completedCount = result[0].completedCount[0]?.count ?? 0;

      return res.status(200).json({
        success: true,
        message: "Bạn đã lấy danh sách Tasks Thành Công!",
        tasks,
        activeCount,
        completedCount,
        result,
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

  async getAllTaskByFilter(req, res) {
    try {
      const { filter, filterDateTime } = req.query;

      const query = {};
      // console.log("filterDateTime: ", filterDateTime);

      if (filter !== "all") {
        query.status = filter;
      }
      if (filterDateTime !== "all") {
        let now = new Date();
        now.setHours(0, 0, 0, 0); // setHours(hour, minute, second, millisecond)

        if (filterDateTime === "today") {
          query.createdAt = { $gte: now };
        } else if (filterDateTime === "week") {
          now.setDate(now.getDate() - 1 * 7); // trừ 1 ngày
          query.createdAt = { $gte: now };
        } else if (filterDateTime === "month") {
          now.setMonth(now.getMonth() - 1); // trừ 1 tháng

          query.createdAt = { $gte: now };
        }

        // console.log("now: ", now);
      }

      // đwua thành mảng
      let pipeline = [];

      if (Object.keys(query).length > 0) {
        pipeline.push({ $match: query });
      }

      pipeline.push({ $sort: { createdAt: -1 } });

      const result = await Task.aggregate([
        {
          $facet: {
            tasks: pipeline,
            activeCount: [
              { $match: { status: "active" } }, // lọc
              { $count: "count" }, // $count: "count" với $count là phương thức đếm, "count" là tên key
            ],
            completedCount: [
              { $match: { status: "completed" } },
              { $count: "count" }, // $count: "count" với $count là phương thức đếm, "count" là tên key
            ],
          },
        },
      ]);

      const tasks = result[0].tasks;
      const activeCount = result[0].activeCount[0]?.count ?? 0;
      const completedCount = result[0].completedCount[0]?.count ?? 0;

      return res.status(200).json({
        success: true,
        message: "Bạn đã lấy danh sách Tasks Thành Công!",
        tasks,
        activeCount,
        completedCount,
        result,
      });
    } catch (error) {
      console.error("Lỗi khi lấy toàn bộ danh sách Task: ", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi khi lấy toàn bộ danh sách Task:" + error,
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

      console.log("idTask: ", idTask);

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

  async toggleTask(req, res) {
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

      let status = task.status;
      task.status = status === "active" ? "completed" : "active";

      if (status === "active") {
        task.completeAt = new Date();
      } else {
        task.completeAt = null;
      }

      await task.save();
      return res.status(200).json({
        success: true,
        message: "Bạn đã xoá Task Thành Công!",
        task: task,
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
