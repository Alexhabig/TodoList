import React, { useState } from "react";
import Button from "../components/button";
import * as fa from "react-icons/fa";
import * as io from "react-icons/io";
import * as md from "react-icons/md";
import Todos from "../components/todo";
import { useAddTodo, useCompleteTodo, useGetAllTodos } from "../api";
import Input from "../components/input";
import Textarea from "../components/textarea";

const Fixload = () => {
  const { todos, fetchTodos } = useGetAllTodos();

  const { addTodo } = useAddTodo();

  const { completeTodo } = useCompleteTodo();

  const [formNewTodo, setFormNewTodo] = useState({ title: "", desc: "" });

  const [showAddModal, setShowAddModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [addSuccess, setAddSuccess] = useState(false);

  const todosArray = Array.isArray(todos) ? todos : [];

  const handleCompleteTodo = async (todoId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    await completeTodo(todoId, newStatus);
    await fetchTodos();
  };

  const handleAddTodo = async () => {
    try {
      const addSuccess = await addTodo(formNewTodo);
      if (addSuccess) {
        console.log("New Todo Added");

        setAddSuccess(true);
        await fetchTodos();
      }
    } catch (error) {}
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (showAddModal) {
      await handleAddTodo();
    }
  };

  return (
    <main className="flex justify-center py-10 h-[100vh] bg-blue-400">
      <div className=" container w-[50%] max-h-[100%] flex flex-col border rounded-md p-4 gap-3 bg-gray-100">
        <div className="flex items-center gap-2">
          <h1 className="text-red-950 text-3xl">TodoList</h1>
          <Button
            icon={<fa.FaPlusCircle />}
            classname="text-xl text-blue-400 hover:text-blue-600"
            onClick={() => setShowAddModal(true)}
          />
        </div>

        <div className=" py-3  overflow-y-auto flex flex-col gap ">
          {/* <Todos></Todos> */}
          {todosArray.map((todo: any) => (
            <Todos
              key={todo._id}
              title={todo.title}
              desc={todo.desc}
              status={todo.status}
              onComplete={() => handleCompleteTodo(todo._id, todo.status)}
            />
          ))}
        </div>
      </div>

      {showAddModal || showUpdateModal ? (
        <div className="absolute bg-black inset-0 bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white  w-[50%] p-4 rounded-md flex flex-col gap-y-5 relative">
            <Button
              icon={<io.IoMdClose />}
              classname="absolute right-3 top-0 hover:text-red-700 text-3xl"
              onClick={() => {
                setShowAddModal(false);
              }}
            />
            <h1 className="text-2xl font-medium">Add Todo</h1>
            <div>
              <form
                action=""
                onSubmit={handleFormSubmit}
                className="flex flex-col gap-3"
              >
                <Input
                  placeholder="Title"
                  type="text"
                  value={formNewTodo.title}
                  onChange={(e) =>
                    setFormNewTodo({
                      ...formNewTodo,
                      title: e.target.value,
                    })
                  }
                />
                <Textarea
                  placeholder="Description"
                  value={formNewTodo.desc}
                  onChange={(e) =>
                    setFormNewTodo({ ...formNewTodo, desc: e.target.value })
                  }
                />
                <Button
                  icon={showAddModal ? <fa.FaPlus /> : <md.MdUpdate />}
                  text={`${showAddModal ? "Add" : "Update"}`}
                  classname="bg-blue-500 text-white hover:bg-blue-600"
                  type={"submit"}
                />
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default Fixload;
