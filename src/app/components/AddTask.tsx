"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { addTodo } from "../api";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const AddTask = () => {
  const router = useRouter();
  const [taskTitle, setTaskTitle] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addTodo({ id: uuidv4(), text: taskTitle });
    setTaskTitle("");
    router.refresh();
  };

  return (
    <div>
      <form className="mb-4 space-y-3" onSubmit={handleSubmit}>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTaskTitle(e.target.value)
          }
          value={taskTitle}
        />
        <button className="w-full px-4 py-2 text-white bg-blue-500 rounded transform transition-transform duration-200 hover:bg-blue-400 hover:scale-95">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
