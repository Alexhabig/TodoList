import React, { useEffect, useState } from "react";
import Button from "../components/button";
import * as fa from "react-icons/fa";
import * as io from "react-icons/io";
import * as md from "react-icons/md";
import Todos from "../components/todo";
// import { useAddTodo, useCompleteTodo, useGetAllTodos } from "../api";
import Input from "../components/input";
import Textarea from "../components/textarea";
import { useGetAllTodos } from "../api";

const Fixload = () => {
  const { fetchTodos, todos } = useGetAllTodos();
  const [loading, setLoading] = useState(true);

  // const getTodos = async () => {
  //   setLoading(true);
  //   const todos = await fetchTodos();
  // };

  useEffect(() => {
    const getTodos = async () => {
      try {
        await fetchTodos();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    getTodos();
  }, []);

  const todosArray = Array.isArray(todos) ? todos : [];

  return (
    <main className="flex justify-center py-10 h-[100vh] bg-blue-400">
      {/* set loading when getting data from backend */}

      {loading && (
        <div className="text-3xl absolute inset-0 bg-white/70 flex flex-col gap-1 justify-center items-center">
          <div className="statload"></div>
          <h1 className="animate-bounce">Loading</h1>
        </div>
      )}
      <div className=" container phone:w-[100%] tablet:w-[90%] laptop:w-[50%] max-h-[100%] mx-5 flex flex-col border rounded-md p-4 gap-3 bg-gray-100">
        {todosArray.map((todo: any) => (
          <Todos
            key={todo._id}
            title={todo.title}
            desc={todo.desc}
            status={todo.status}
          />
        ))}
      </div>
    </main>
  );
};

export default Fixload;
