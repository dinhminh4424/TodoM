import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2Icon,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";

const TaskCard = ({ task, index }) => {
  let isEditing = false;

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transform-all duration-200 animate-fade-in group",
        task.status === "completed" && "opacity-75",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* button tròn */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200 ",
            task.status === "completed"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary",
          )}
        >
          {task.status === "completed" ? (
            <CheckCircle2Icon className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/*  hiển thị hoặc điều chỉnh */}
        <div className="flex-1 min-w-0 ">
          {isEditing ? (
            <Input
              placeholder="Bạn cần phải làm gì?"
              className={
                "flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              }
              type="text"
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200 ",
                task.status === "completed"
                  ? "line-through text-muted-foreground"
                  : "text-foreground",
              )}
            >
              {task.title}
            </p>
          )}
          {/* Ngày tạo và ngày hoàn thành */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />

            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
            {task.status === "completed" && (
              <>
                {" "}
                <span className="text-xs text-muted-foreground">-</span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completeAt).toLocaleDateString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* nút điều chỉnh và xoá */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* Nút edit */}
          <Button
            variant="ghost"
            size="icon"
            className={
              "flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            }
          >
            <SquarePen className="size-4" />
          </Button>

          {/* Nút xoá */}
          <Button
            variant="ghost"
            size="icon"
            className={
              "flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            }
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
