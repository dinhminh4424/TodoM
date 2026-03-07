import express from "express";
import taskController from "../controllers/taskController.js";

const router = express.Router();

router.get("/byFilter", taskController.getAllTaskByFilter);
router.get("/:idTask", taskController.getTaskById);
router.get("/", taskController.getAllTask);

router.put("/:idTask/toggleTask", taskController.toggleTask);
router.put("/:idTask", taskController.updateTask);
router.post("/", taskController.createTask);

router.delete("/:idTask", taskController.deleteTask);

export default router;
