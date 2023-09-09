import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { ITodo } from "../types";

// Replace 'YourApiUrl' with the actual URL of your API
const API_URL = process.env.REACT_APP_USER_API_BILL || "";

// api access for login
export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string | undefined>();
  const [data, setData] = useState<any>();

  const login = async (formLogin: any) => {
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.post(
        API_URL + "/auth/login",
        formLogin,
        { withCredentials: true }
      );

      setData(response.data);
      return response?.data;
    } catch (error) {
      setLoginError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  return { login, loading, loginError, data };
};

export const useGetUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<any>();

  const getUser = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.get(API_URL + "/users", {
        withCredentials: true,
      });

      setData(response.data);
      setLoading(false);
      return response?.data;
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return { getUser, loading, error, data };
};
