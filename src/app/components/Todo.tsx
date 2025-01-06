"use client";

import { Task } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, updateTodo } from "../api";

interface TodoProps {
  todo: Task;
}

export const Todo = ({ todo }: TodoProps) => {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskText, setEditedTaskText] = useState(todo.text);

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await updateTodo(todo.id, editedTaskText);
    setIsEditing(false);
    router.refresh();
  };
  const handleDelete = async () => {
    await deleteTodo(todo.id);
    router.refresh();
  };

  return (
    <li
      key={todo.id}
      className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
    >
      {isEditing ? (
        <input
          ref={ref}
          type="text"
          className="mr-2 px-2 py-1 border rounded focus:outline-none focus:border-blue-400"
          value={editedTaskText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEditedTaskText(e.target.value)
          }
        />
      ) : (
        <span className="text-gray-700">{todo.text}</span>
      )}
      <div className="flex space-x-2">
        {isEditing ? (
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={handleSave}
          >
            保存
          </button>
        ) : (
          <button
            className="text-green-500 hover:text-green-700"
            onClick={handleEdit}
          >
            編集
          </button>
        )}
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleDelete}
        >
          削除
        </button>
      </div>
    </li>
  );
};

export default Todo;
