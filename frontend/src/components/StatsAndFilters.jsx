import React from "react";
import { Badge } from "./ui/badge";
import { FilterType } from "@/lib/data";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

const StatsAndFilters = ({
  completeTaskCount = 0,
  activeTaskCount = 0,
  filter = "all",
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      {/* Phần thống kê */}
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-success/20"
        >
          {completeTaskCount} {FilterType.completed}
        </Badge>
        <Badge variant="secondary" className="">
          {activeTaskCount} {FilterType.active}
        </Badge>
      </div>
      {/* Phần filter */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {Object.keys(FilterType).map((k) => (
          <Button
            variant={filter === k ? "gradient" : "ghost"}
            size="sm"
            className="capitalize"
            key={k}
          >
            <Filter className="size-4" />
            {FilterType[k]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilters;
