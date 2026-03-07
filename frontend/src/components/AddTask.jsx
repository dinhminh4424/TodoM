import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const AddTask = ({ handleAddTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleSubmit = () => {
    try {
      if (!newTaskTitle || !newTaskTitle.trim()) {
        return;
      }
      handleAddTask(newTaskTitle);

      setNewTaskTitle("");
    } catch (error) {
      toast.error("Lỗi khi thêm task: ", error);
    }
  };

  const handleOnKeyDown = (event) => {
    // console.log("event: ", event);
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Cần phải làm gì?"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(e) => {
            setNewTaskTitle(e.target?.value ?? "");
          }}
          onKeyDown={handleOnKeyDown}
        />
        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          disabled={!newTaskTitle || !newTaskTitle.trim()}
          onClick={handleSubmit}
        >
          <Plus className="size-5" />
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
