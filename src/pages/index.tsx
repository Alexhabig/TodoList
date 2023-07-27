import React, { useState } from "react";
import Button from "../components/button";
import * as io from "react-icons/io";
import * as fa from "react-icons/fa";
import * as md from "react-icons/md";
import Input from "../components/input";
import Todos from "../components/todo";
import Textarea from "../components/textarea";
import "../index.css";
import {
  useAddTodo,
  useCompleteTodo,
  useDeleteTodo,
  useGetAllTodos,
  useUpdateTodo,
} from "../api";

const Todo = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const { todos, fetchTodos } = useGetAllTodos();

  const [formAddTodo, setFormAddTodo] = useState({ title: "", desc: "" });

  const [addSuccess, setAddSuccess] = useState(false);

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [todoID, SetTodoId] = useState<string | null>(null);

  const [toBeLoadTodoId, setToBeLoadTodoId] = useState<string | null>(null);

  const [deletingAll, setDeletingAll] = useState(false);

  const { completeTodo } = useCompleteTodo();

  const { updateTodo } = useUpdateTodo();

  const { addTodo } = useAddTodo();

  const { deleteTodo } = useDeleteTodo();

  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await deleteTodo(todoId);
      await fetchTodos();
    } catch (error) {
      console.error("Delete Failed:", error);
      alert(
        "An error occurred while deleting the todo. Please try again later."
      );
    }
  };

  const handleDeleteAllTodos = async () => {
    try {
      setDeletingAll(true);

      for (const todo of todosArray) {
        await deleteTodo(todo._id);
      }

      await fetchTodos();
      setDeletingAll(false);
    } catch (error) {
      console.error("Delete All Failed:", error);
      alert(
        "An error occurred while deleting all todos. Please try again later."
      );
      setDeletingAll(false);
    }
  };

  const handleUpdateTodo = async (todoId: string) => {
    // e.preventDefault();
    try {
      if (todoId) {
        await updateTodo(todoId, formAddTodo);
        await fetchTodos();
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 1500);
      }
    } catch (error) {
      console.error("Update Failed:", error);
      alert(
        "An error occurred while updating the todo. Please try again later."
      );
    }
  };

  const handleCompleteTodo = async (todoId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    try {
      await completeTodo(todoId, newStatus);
      setToBeLoadTodoId(todoId);
      await fetchTodos();
    } catch (error) {
      console.error("Complete Todo Failed:", error);
      alert(
        "An error occurred while completing the todo. Please try again later."
      );
    }
    setToBeLoadTodoId("");
  };

  const handleAddTodo = async () => {
    if (formAddTodo.title.trim() === "" && formAddTodo.desc.trim() === "") {
      setErrorMessage("Please enter text in the title or description.");
      return;
    }
    try {
      const addSuccess = await addTodo(formAddTodo);
      if (addSuccess) {
        console.log("New Todo Added");

        setAddSuccess(true);
        await fetchTodos();

        setTimeout(() => setAddSuccess(false), 1500);
        setFormAddTodo({
          title: "",
          desc: "",
        });
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Register Failed:", error);
      alert("An error occurred while Register. Please try again later.");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (showAddModal) {
      await handleAddTodo();
    } else if (showUpdateModal && todoID) {
      await handleUpdateTodo(todoID);
    }
  };
  const todosArray = Array.isArray(todos) ? todos : [];
  // if (loading && !addSuccess) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <main className="flex justify-center py-10 h-[100vh] bg-blue-400">
      <div className=" container phone:w-[100%] tablet:w-[90%] laptop:w-[50%] max-h-[100%] mx-5 flex flex-col border rounded-md p-4 gap-3 bg-gray-100">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-red-950 text-3xl">TodoList</h1>
            <Button
              icon={<fa.FaPlusCircle />}
              classname="text-xl text-blue-400 hover:text-blue-600"
              onClick={() => {
                setShowAddModal(true);
                setFormAddTodo({
                  title: "",
                  desc: "",
                });
              }}
            />
          </div>
          {todosArray.length > 1 && (
            <Button
              disable={deletingAll}
              onClick={handleDeleteAllTodos}
              text="Delete All"
              classname=" border border-red-500  px-5 text-red-500 hover:bg-red-500 hover:text-white"
            />
          )}
        </div>
        <div className=" py-3  overflow-y-auto flex flex-col">
          {deletingAll && (
            <div className="fixed inset-0 bg-slate-700 bg-opacity-60 flex flex-col justify-center items-center">
              <div className="load"></div>
              <p className="text-white mt-2">Deleting all todos...</p>
            </div>
          )}

          {todosArray.length === 0 ? (
            <div className="flex justify-center pt-52 h-screen ">
              <h1 className="text-3xl">No Todo Available</h1>
            </div>
          ) : (
            todosArray.map((todo: any) => (
              <Todos
                key={todo._id}
                title={todo.title}
                desc={todo.desc}
                status={todo.status}
                onComplete={() => handleCompleteTodo(todo._id, todo.status)}
                isUpdate={toBeLoadTodoId === todo._id}
                onEdit={() => {
                  setShowUpdateModal(true);
                  setFormAddTodo({
                    title: todo.title,
                    desc: todo.desc,
                  });
                  SetTodoId(todo._id); // Set the todoId state when clicking on Edit
                }}
                onDelete={() => handleDeleteTodo(todo._id)}
              />
            ))
          )}
        </div>
      </div>
      {showAddModal || showUpdateModal ? (
        <div className="absolute bg-black inset-0 bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white phone:w-[100%] tablet:w-[70%] laptop:w-[50%] mx-4 p-4 rounded-md flex flex-col gap-y-5 relative">
            <Button
              icon={<io.IoMdClose />}
              classname="absolute right-3 top-0 hover:text-red-700 text-3xl"
              onClick={() => {
                setShowAddModal(false);
                setShowUpdateModal(false);
              }}
            />
            <h1 className="text-2xl font-medium">{`${
              (showAddModal && "Add Todo") || (showUpdateModal && "Update Todo")
            }`}</h1>
            <div>
              <form
                action=""
                onSubmit={handleFormSubmit}
                className="flex flex-col gap-3"
              >
                <Input
                  placeholder="Title"
                  type="text"
                  value={formAddTodo.title}
                  onChange={(e) =>
                    setFormAddTodo({
                      ...formAddTodo,
                      title: e.target.value,
                    })
                  }
                />
                <Textarea
                  placeholder="Description"
                  value={formAddTodo.desc}
                  onChange={(e) =>
                    setFormAddTodo({ ...formAddTodo, desc: e.target.value })
                  }
                />
                {errorMessage && (
                  <p className="text-red-600 text-sm">{errorMessage}</p>
                )}
                <Button
                  disable={addSuccess || updateSuccess}
                  icon={showAddModal ? <fa.FaPlus /> : <md.MdUpdate />}
                  text={`${showAddModal ? "Add" : "Update"}`}
                  // bg-blue-500 text-white hover:bg-blue-600
                  classname={` ${
                    addSuccess
                      ? "bg-gray-300 hover:bg-gray-300 "
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }
                    ${
                      updateSuccess
                        ? "bg-gray-300 hover:bg-gray-300"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  type={"submit"}
                />
              </form>
            </div>
          </div>
          {addSuccess && (
            <div className="bg-green-500 text-white p-2 rounded-md absolute top-2 w-[50%] text-center">
              New Todo Added Success fully!
            </div>
          )}
          {updateSuccess && (
            <div className="bg-green-500 text-white p-2 rounded-md absolute top-2 w-[50%] text-center">
              Todo Updated Success fully!
            </div>
          )}
        </div>
      ) : null}
    </main>
  );
};

export default Todo;
