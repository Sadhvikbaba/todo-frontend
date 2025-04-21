"use client";

import axios from "axios";

const baseURL = String(process.env.NEXT_PUBLIC_URL);

// Always get token in a safe way (after the window object is available)
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const getApiClient = () => {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
    withCredentials: true,
  });
};

const handleApiResponse = (apiCall) => {
  return new Promise((resolve, reject) => {
    apiCall
      .then((res) => resolve(res.data))
      .catch((error) => {
        const errorMessage = error?.response?.data || "Unknown error";
        reject(errorMessage);
      });
  });
};

export const userLogin = (credentials) =>
  handleApiResponse(
    getApiClient().post(`/api/login`, { ...credentials })
  );

export const userSignUp = (credentials) =>
  handleApiResponse(
    getApiClient().post(`/api/signup`, { ...credentials })
  );

export const createTodo = (credentials) =>
  handleApiResponse(
    getApiClient().post(`/api/todos`, { ...credentials })
  );

export const updateTodo = (id, credentials) =>
  handleApiResponse(
    getApiClient().put(`/api/todos/${id}`, { ...credentials })
  );

export const toggleTodo = (id) =>
  handleApiResponse(
    getApiClient().patch(`/api/todos/toggle/${id}`, {})
  );

export const getTodos = () =>
  handleApiResponse(
    getApiClient().get(`/api/todos`)
  );

export const deleteTodos = (id) =>
  handleApiResponse(
    getApiClient().delete(`/api/todos/${id}`)
  );


/*
sign up :
{
    "Username" : "sadhvik" ,
    "Email" : "psadhvik2006@gmail.com",
    "Password" : "Saibaba@2006"
}

login :
{
    "Email" : "psadhvik2006@gmail.com",
    "Password" : "Saibaba@2006"
}

create todo
{
  "title": "Finish learning GO",
  "description": "Complete the todo app with Fiber and MongoDB",
  "isCompleted": false,
  "context": "work"
}

update todo
{
    "Title" : "finish todo project first",
    "Description" : "Complete the todo app with Fiber and MongoDB"
}


*/ 