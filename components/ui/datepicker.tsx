"use client";

import * as React from "react";
import { format } from "date-fns";
import { LuCalendar as CalendarIcon } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectSingleEventHandler } from "react-day-picker";

interface DatePickerProps {
  date: Date;
  setDate: (arg: Date) => void;
  disabled?: (arg: Date) => boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({ date, setDate, disabled }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" side="top">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate as SelectSingleEventHandler}
          defaultMonth={date}
          initialFocus
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
};
