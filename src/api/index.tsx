import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { ITodo } from "../types";

// Replace 'YourApiUrl' with the actual URL of your API
const API_URL = process.env.REACT_APP_USER_API || "";

//api access to get all todos
export const useGetAllTodos = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  const [todos, getTodo] = useState<ITodo[] | any>();

  const fetchTodos = async () => {
    setLoading(true);
    // alert(API_URL);
    try {
      const response: AxiosResponse = await axios.get(API_URL + "/todos", {
        withCredentials: true,
      });
      getTodo(response.data);
      setLoading(false);
    } catch (error) {
      setError("An error occured while fetchin data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return { loading, error, todos, fetchTodos };
};

// api access for add todo
export const useAddTodo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  const [todo, setTodo] = useState<ITodo | any>();

  const addTodo = async (formAddTodo: any) => {
    setLoading(true);
    // alert(API_URL);
    try {
      const response: AxiosResponse = await axios.post(
        API_URL + "/todos/add",
        formAddTodo
      );
      setTodo(response.data);

      return response?.data;
    } catch (error) {
      setError("An error occurred while fetching data.");
      setLoading(false);
    }
  };

  return { addTodo, loading, error, todo };
};

// api access for checking status
export const useCompleteTodo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  const [todo, setTodo] = useState<ITodo | any>();

  const completeTodo = async (todoid: string, status: boolean) => {
    setLoading(true);
    // alert(API_URL);
    try {
      const response: AxiosResponse = await axios.patch(
        API_URL + `/todos/complete/${todoid}`,
        { status }
      );
      setTodo(response.data);

      return response?.data;
    } catch (error) {
      setError("An error occurred while fetching data.");
      setLoading(false);
    }
  };

  return { completeTodo, loading, error, todo };
};

// api access for updatetodo
export const useUpdateTodo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  const [updatedTodo, setUpdatedTodo] = useState<ITodo | any>();

  const updateTodo = async (todoId: string, formUpdateTodo: any) => {
    setLoading(true);
    // alert(API_URL);
    try {
      const response: AxiosResponse = await axios.patch(
        API_URL + `/todos/${todoId}`,
        formUpdateTodo
      );
      setUpdatedTodo(response.data);

      return response?.data;
    } catch (error) {
      setError("An error occurred while fetching data.");
      setLoading(false);
    }
  };

  return { updateTodo, loading, error, updatedTodo };
};

// api access for deleting todo
export const useDeleteTodo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  const [deletedTodo, setDeleteTodo] = useState<ITodo | any>();

  const deleteTodo = async (todoid: string) => {
    setLoading(true);
    // alert(API_URL);
    try {
      const response: AxiosResponse = await axios.delete(
        API_URL + `/todos/${todoid}`
      );
      setDeleteTodo(response.data);

      return response?.data;
    } catch (error) {
      setError("An error occurred while fetching data.");
      setLoading(false);
    }
  };

  return { deleteTodo, loading, error, deletedTodo };
};
